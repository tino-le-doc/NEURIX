/**
 * GPU provider adapter (Phase 2 — Cloud IA).
 *
 * Abstracts the upstream provider (RunPod, Vast.ai) behind a small surface:
 *   - provisionInstance({ offer, userId }) -> { providerId, provider, host, ... }
 *   - stopInstance(providerId)             -> { providerId, status: "stopped" }
 *   - verifyProviderWebhook(sig, rawBody)  -> boolean
 *
 * When `RUNPOD_API_KEY` is not set (dev / CI / demo) the adapter returns a
 * deterministic mock so the full rental flow can be exercised end-to-end
 * without real compute credentials.
 */
import crypto from "crypto";
import logger from "./logger";

function isConfigured() {
  return Boolean(process.env.RUNPOD_API_KEY);
}

function mockProvision(offer) {
  const providerId = `mock_${crypto.randomUUID().slice(0, 8)}`;
  logger.info("gpu provider: mock provision", {
    offerId: offer.id,
    providerId,
  });
  return {
    providerId,
    provider: "mock",
    host: `${providerId}.gpu.neurix.local`,
    region: "eu-west",
    status: "provisioning",
  };
}

export async function provisionInstance({ offer /* , userId */ }) {
  if (!isConfigured()) {
    return mockProvision(offer);
  }
  // Real RunPod API call would go here (GraphQL createPod mutation).
  // Keeping the mock until keys are wired up so the rental flow stays
  // testable end-to-end.
  logger.warn("runpod: real provisioning not implemented yet — using mock");
  return mockProvision(offer);
}

export async function stopInstance(providerId) {
  if (!isConfigured()) {
    logger.info("gpu provider: mock stop", { providerId });
    return { providerId, status: "stopped" };
  }
  logger.warn("runpod: real stop not implemented yet — using mock");
  return { providerId, status: "stopped" };
}

/**
 * Verifies a provider webhook using HMAC-SHA256 with `RUNPOD_WEBHOOK_SECRET`.
 * Returns `false` when the secret is missing so the webhook route can decide
 * whether to reject or fall back to development mode.
 */
export function verifyProviderWebhook(signature, rawBody) {
  const secret = process.env.RUNPOD_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  const sigBuf = Buffer.from(String(signature), "hex");
  const expBuf = Buffer.from(expected, "hex");
  if (sigBuf.length !== expBuf.length) return false;
  try {
    return crypto.timingSafeEqual(sigBuf, expBuf);
  } catch {
    return false;
  }
}
