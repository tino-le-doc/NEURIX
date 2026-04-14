import {
  signJupyterToken,
  verifyJupyterToken,
  buildJupyterUrl,
} from "@/lib/gpuAccess";

describe("gpuAccess", () => {
  const instanceId = "inst_123";
  const userId = "user_456";

  it("round-trips a valid token", () => {
    const token = signJupyterToken({ instanceId, userId });
    const payload = verifyJupyterToken(token);
    expect(payload).toBeTruthy();
    expect(payload.instanceId).toBe(instanceId);
    expect(payload.userId).toBe(userId);
    expect(typeof payload.exp).toBe("number");
  });

  it("rejects a tampered payload", () => {
    const token = signJupyterToken({ instanceId, userId });
    const [, sig] = token.split(".");
    const tampered = `${Buffer.from(
      JSON.stringify({ instanceId: "inst_evil", userId, exp: Date.now() + 60000 })
    )
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "")}.${sig}`;
    expect(verifyJupyterToken(tampered)).toBeNull();
  });

  it("rejects an expired token", () => {
    const token = signJupyterToken({ instanceId, userId, ttlMs: -1000 });
    expect(verifyJupyterToken(token)).toBeNull();
  });

  it("rejects malformed inputs", () => {
    expect(verifyJupyterToken(null)).toBeNull();
    expect(verifyJupyterToken("")).toBeNull();
    expect(verifyJupyterToken("not-a-token")).toBeNull();
  });

  it("builds a jupyter url", () => {
    const url = buildJupyterUrl({ host: "pod.example", token: "abc.def" });
    expect(url).toBe("https://pod.example/jupyter?token=abc.def");
  });
});
