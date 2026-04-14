import { apiHandler } from "@/lib/apiHandler";
import { getInstance, updateInstance } from "@/lib/gpuInstances";
import { stopInstance } from "@/lib/gpuProvider";
import logger from "@/lib/logger";

function canAccess(instance, session) {
  if (!instance) return false;
  return (
    instance.userId === session.user.id || session.user.role === "admin"
  );
}

/**
 * GET    /api/gpu/instances/:id — detail for the authenticated owner
 * DELETE /api/gpu/instances/:id — stop the instance upstream and mark stopped
 */
export default apiHandler(
  {
    GET: async (req, res, { session }) => {
      const instance = getInstance(req.query.id);
      if (!canAccess(instance, session)) {
        return res.status(404).json({ error: "Instance introuvable" });
      }
      return res.status(200).json({ instance });
    },

    DELETE: async (req, res, { session }) => {
      const instance = getInstance(req.query.id);
      if (!canAccess(instance, session)) {
        return res.status(404).json({ error: "Instance introuvable" });
      }
      if (instance.status === "stopped") {
        return res.status(200).json({ instance });
      }
      updateInstance(instance.id, { status: "stopping" });
      if (instance.providerId) {
        try {
          await stopInstance(instance.providerId);
        } catch (err) {
          logger.error("gpu stop failed upstream", {
            instanceId: instance.id,
            message: err.message,
          });
        }
      }
      const updated = updateInstance(instance.id, {
        status: "stopped",
        stoppedAt: new Date().toISOString(),
      });
      logger.info("gpu instance stopped", {
        instanceId: instance.id,
        userId: session.user.id,
      });
      return res.status(200).json({ instance: updated });
    },
  },
  { auth: true }
);
