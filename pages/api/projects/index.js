import { apiHandler } from "@/lib/apiHandler";
import { projectSchema } from "@/lib/validators";
import db from "@/lib/db";

const COLLECTION = "projects";

export default apiHandler(
  {
    GET: async (_req, res, { session }) => {
      const rows = db.findAll(
        COLLECTION,
        (p) => p.ownerId === session.user.id
      );
      return res.status(200).json({ projects: rows });
    },

    POST: async (req, res, { session }) => {
      const data = projectSchema.parse(req.body);
      const project = db.create(COLLECTION, {
        ...data,
        ownerId: session.user.id,
        status: "active",
        jobCount: 0,
      });
      return res.status(201).json({ project });
    },
  },
  { auth: true }
);
