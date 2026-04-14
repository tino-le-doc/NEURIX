import logger from "@/lib/logger";
import { verifyProviderWebhook } from "@/lib/gpuProvider";
import { findByProviderId, updateInstance } from "@/lib/gpuInstances";

/**
 * RunPod / Vast.ai webhook — receives pod lifecycle events and updates the
 * corresponding `gpu_instances` row so the /my-gpus dashboard reflects the
 * real state of the upstream compute.
 *
 * Signature verification uses HMAC-SHA256 with `RUNPOD_WEBHOOK_SECRET`; if
 * that secret is missing we accept unsigned payloads but log a warning so
 * the deployment team can spot the gap.
 *
 * Raw body is required for HMAC verification, so Next.js body parsing is
 * disabled here.
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const STATUS_MAP = {
  POD_PROVISIONING: "provisioning",
  POD_RUNNING: "running",
  POD_STOPPING: "stopping",
  POD_STOPPED: "stopped",
  POD_FAILED: "failed",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const rawBody = await readRawBody(req);
  const signature = req.headers["x-runpod-signature"];

  if (process.env.RUNPOD_WEBHOOK_SECRET) {
    if (!verifyProviderWebhook(signature, rawBody)) {
      logger.warn("gpu webhook: signature verification failed");
      return res.status(401).json({ error: "Invalid signature" });
    }
  } else {
    logger.warn(
      "gpu webhook: RUNPOD_WEBHOOK_SECRET not set — accepting without verification"
    );
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString("utf8"));
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const providerId = event.podId || event.providerId;
  if (!providerId) {
    return res.status(400).json({ error: "Missing podId" });
  }

  const instance = findByProviderId(providerId);
  if (!instance) {
    logger.warn("gpu webhook: unknown providerId", { providerId });
    return res.status(200).json({ received: true, ignored: true });
  }

  const nextStatus = STATUS_MAP[event.type];
  if (nextStatus) {
    const patch = { status: nextStatus };
    if (event.host) patch.host = event.host;
    if (event.error) patch.error = event.error;
    updateInstance(instance.id, patch);
    logger.info("gpu instance lifecycle", {
      instanceId: instance.id,
      status: nextStatus,
    });
  } else {
    logger.debug("gpu webhook: ignored event type", { type: event.type });
  }

  return res.status(200).json({ received: true });
}
