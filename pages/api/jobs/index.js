import { apiHandler } from "@/lib/apiHandler";
import { jobSchema } from "@/lib/validators";
import db from "@/lib/db";

const COLLECTION = "jobs";

export default apiHandler(
  {
    GET: async (req, res, { session }) => {
      const { status, model, projectId } = req.query;
      const rows = db.findAll(COLLECTION, (job) => {
        if (job.ownerId !== session.user.id && session.user.role !== "admin") {
          return false;
        }
        if (status && job.status !== status) return false;
        if (model && job.model !== model) return false;
        if (projectId && job.projectId !== projectId) return false;
        return true;
      });
      return res.status(200).json({ jobs: rows });
    },

    POST: async (req, res, { session }) => {
      const data = jobSchema.parse(req.body);
      const job = db.create(COLLECTION, {
        ...data,
        ownerId: session.user.id,
        status: "queued",
        cost: 0,
        durationSec: 0,
      });
      return res.status(201).json({ job });
    },
  },
  { auth: true }
);
