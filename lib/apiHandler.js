import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { formatZodErrors } from "./validators";
import logger from "./logger";

/**
 * Tiny helper that wraps a Next.js API handler with:
 *   - method dispatching ({ GET, POST, ... })
 *   - centralized error handling
 *   - optional authentication enforcement
 *   - optional role enforcement
 *
 * Usage:
 *   export default apiHandler({
 *     GET: async (req, res, { session }) => {...},
 *     POST: async (req, res) => {...},
 *   }, { auth: true, roles: ["admin"] });
 */
export function apiHandler(handlers, options = {}) {
  const { auth = false, roles = null } = options;

  return async function handler(req, res) {
    try {
      const methodHandler = handlers[req.method];
      if (!methodHandler) {
        res.setHeader("Allow", Object.keys(handlers).join(", "));
        return res.status(405).json({ error: "Method Not Allowed" });
      }

      let session = null;
      if (auth || roles) {
        session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: "Non authentifié" });
        }
        if (roles && !roles.includes(session.user?.role || "user")) {
          return res.status(403).json({ error: "Accès refusé" });
        }
      }

      return await methodHandler(req, res, { session });
    } catch (err) {
      if (err?.name === "ZodError") {
        return res
          .status(400)
          .json({ error: "Validation échouée", details: formatZodErrors(err) });
      }
      if (err?.code === "USER_EXISTS") {
        return res.status(409).json({ error: err.message });
      }
      logger.error("api handler error", {
        path: req.url,
        method: req.method,
        message: err?.message,
      });
      return res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };
}

export default apiHandler;
