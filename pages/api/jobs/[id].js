import { apiHandler } from "@/lib/apiHandler";
import db from "@/lib/db";

const COLLECTION = "jobs";

function canAccess(job, session) {
  if (!job) return false;
  return job.ownerId === session.user.id || session.user.role === "admin";
}

export default apiHandler(
  {
    GET: async (req, res, { session }) => {
      const job = db.findById(COLLECTION, req.query.id);
      if (!canAccess(job, session)) {
        return res.status(404).json({ error: "Job introuvable" });
      }
      return res.status(200).json({ job });
    },

    DELETE: async (req, res, { session }) => {
      const job = db.findById(COLLECTION, req.query.id);
      if (!canAccess(job, session)) {
        return res.status(404).json({ error: "Job introuvable" });
      }
      db.remove(COLLECTION, req.query.id);
      return res.status(204).end();
    },
  },
  { auth: true }
);
