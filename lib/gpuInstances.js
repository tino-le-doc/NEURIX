import db from "./db";

/**
 * Persistence helpers for GPU rental instances (Phase 2 — Cloud IA).
 *
 * Stored in the JSON file-backed db under the `gpu_instances` collection.
 * Each row represents one rental purchased by a user; it is created in
 * `pending_payment` at checkout time, transitions to `provisioning` after the
 * Stripe webhook fires, then to `running` / `stopped` / `failed` as the
 * provider (RunPod, Vast.ai) reports back through /api/gpu/webhook.
 */
const COLLECTION = "gpu_instances";

export const INSTANCE_STATUSES = [
  "pending_payment",
  "provisioning",
  "running",
  "stopping",
  "stopped",
  "failed",
];

export function listInstancesByUser(userId) {
  return db.findAll(COLLECTION, (i) => i.userId === userId);
}

export function getInstance(id) {
  return db.findById(COLLECTION, id);
}

export function findByProviderId(providerId) {
  if (!providerId) return null;
  return db.findOne(COLLECTION, (i) => i.providerId === providerId);
}

export function findByCheckoutSessionId(sessionId) {
  if (!sessionId) return null;
  return db.findOne(COLLECTION, (i) => i.checkoutSessionId === sessionId);
}

export function createPendingInstance({ userId, offer, hours }) {
  return db.create(COLLECTION, {
    userId,
    offerId: offer.id,
    offerName: offer.name,
    gpu: offer.gpu,
    hours,
    pricePerHour: offer.price,
    totalPrice: Number((offer.price * hours).toFixed(2)),
    currency: offer.currency,
    status: "pending_payment",
    providerId: null,
    provider: null,
    host: null,
    region: null,
    jupyterUrl: null,
  });
}

export function updateInstance(id, patch) {
  return db.update(COLLECTION, id, patch);
}
