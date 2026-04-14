import { apiHandler } from "@/lib/apiHandler";
import { getGpuCatalog } from "@/lib/gpuCatalog";

/**
 * GET /api/gpu
 *
 * Retourne le catalogue public des offres GPU (Phase 2 — Cloud IA).
 * Endpoint non authentifié pour servir la page marketing `/gpu-rental`.
 */
export default apiHandler({
  GET: async (_req, res) => {
    // Strip internal fields (cost / margin) before exposing offers publicly.
    const offers = getGpuCatalog().map((offer) => {
      const { cost: _cost, margin: _margin, marginRatio: _marginRatio, ...publicFields } = offer;
      return publicFields;
    });
    return res.status(200).json({
      offers,
      currency: "eur",
      unit: "hour",
      updatedAt: new Date().toISOString(),
    });
  },
});
