import { apiHandler } from "@/lib/apiHandler";
import { listInstancesByUser } from "@/lib/gpuInstances";

/**
 * GET /api/gpu/instances
 *
 * Returns every GPU rental owned by the authenticated user, sorted newest
 * first. Powers the /my-gpus dashboard page.
 */
export default apiHandler(
  {
    GET: async (_req, res, { session }) => {
      const instances = listInstancesByUser(session.user.id).sort((a, b) =>
        String(b.createdAt).localeCompare(String(a.createdAt))
      );
      return res.status(200).json({ instances });
    },
  },
  { auth: true }
);
