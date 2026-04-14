import { apiHandler } from "@/lib/apiHandler";
import { projectSchema } from "@/lib/validators";
import db from "@/lib/db";

const COLLECTION = "projects";

function ensureOwnership(project, session) {
  if (!project) return { status: 404, error: "Projet introuvable" };
  if (project.ownerId !== session.user.id && session.user.role !== "admin") {
    return { status: 403, error: "Accès refusé" };
  }
  return null;
}

export default apiHandler(
  {
    GET: async (req, res, { session }) => {
      const project = db.findById(COLLECTION, req.query.id);
      const err = ensureOwnership(project, session);
      if (err) return res.status(err.status).json({ error: err.error });
      return res.status(200).json({ project });
    },

    PUT: async (req, res, { session }) => {
      const existing = db.findById(COLLECTION, req.query.id);
      const err = ensureOwnership(existing, session);
      if (err) return res.status(err.status).json({ error: err.error });
      const data = projectSchema.parse(req.body);
      const updated = db.update(COLLECTION, req.query.id, data);
      return res.status(200).json({ project: updated });
    },

    DELETE: async (req, res, { session }) => {
      const existing = db.findById(COLLECTION, req.query.id);
      const err = ensureOwnership(existing, session);
      if (err) return res.status(err.status).json({ error: err.error });
      db.remove(COLLECTION, req.query.id);
      return res.status(204).end();
    },
  },
  { auth: true }
);
