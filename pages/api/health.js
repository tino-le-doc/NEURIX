import { apiHandler } from "@/lib/apiHandler";

export default apiHandler({
  GET: async (_req, res) => {
    return res.status(200).json({
      status: "ok",
      service: "neu-rix-api",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  },
});
