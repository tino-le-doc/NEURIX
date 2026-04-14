/**
 * Signed Jupyter access tokens for GPU rental instances (Phase 2).
 *
 * Format: `<payload-base64url>.<hmac-sha256-base64url>`
 *
 * The token binds an `instanceId`, `userId` and an expiration. The provider-
 * side Jupyter server is expected to validate it using the same secret
 * (`GPU_ACCESS_SECRET`, falling back to `NEXTAUTH_SECRET` to keep dev simple).
 */
import crypto from "crypto";

const DEFAULT_TTL_MS = 2 * 60 * 60 * 1000; // 2h

function getSecret() {
  return (
    process.env.GPU_ACCESS_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "dev-gpu-access-secret"
  );
}

function toBase64Url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(str) {
  const padded = str
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(str.length / 4) * 4, "=");
  return Buffer.from(padded, "base64");
}

function sign(raw) {
  return toBase64Url(
    crypto.createHmac("sha256", getSecret()).update(raw).digest()
  );
}

export function signJupyterToken({ instanceId, userId, ttlMs = DEFAULT_TTL_MS }) {
  if (!instanceId || !userId) {
    throw new Error("signJupyterToken: instanceId and userId are required");
  }
  const payload = {
    instanceId,
    userId,
    exp: Date.now() + ttlMs,
  };
  const raw = toBase64Url(JSON.stringify(payload));
  const sig = sign(raw);
  return `${raw}.${sig}`;
}

export function verifyJupyterToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [raw, sig] = parts;
  const expected = sign(raw);
  const sigBuf = Buffer.from(sig, "utf8");
  const expBuf = Buffer.from(expected, "utf8");
  if (sigBuf.length !== expBuf.length) return null;
  try {
    if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;
  } catch {
    return null;
  }
  let payload;
  try {
    payload = JSON.parse(fromBase64Url(raw).toString("utf8"));
  } catch {
    return null;
  }
  if (!payload?.exp || payload.exp < Date.now()) return null;
  return payload;
}

export function buildJupyterUrl({ host, token }) {
  if (!host || !token) return null;
  return `https://${host}/jupyter?token=${encodeURIComponent(token)}`;
}
