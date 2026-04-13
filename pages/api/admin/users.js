import { apiHandler } from "@/lib/apiHandler";
import db from "@/lib/db";
import { toPublic } from "@/lib/users";

const COLLECTION = "users";

export default apiHandler(
  {
    GET: async (_req, res) => {
      const users = db.findAll(COLLECTION).map(toPublic);
      return res.status(200).json({ users });
    },
  },
  { auth: true, roles: ["admin"] }
);
