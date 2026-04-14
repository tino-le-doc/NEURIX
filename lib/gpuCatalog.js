/**
 * Catalogue des offres GPU revendues par neu-rix (Phase 2 — Cloud IA).
 *
 * Les prix `cost` sont les coûts horaires payés au fournisseur amont
 * (RunPod / Vast.ai), `price` est le tarif appliqué à l'utilisateur final.
 * La marge est calculée automatiquement.
 */

export const GPU_PROVIDERS = ["runpod", "vast", "lambda"];

export const GPU_OFFERS = [
  {
    id: "gpu_starter",
    name: "GPU Starter",
    gpu: "RTX 3090",
    vram: "24 Go",
    ram: "32 Go",
    storage: "100 Go SSD",
    provider: "runpod",
    useCases: ["chatbot", "IA légère", "prototypage"],
    cost: 0.5,
    price: 1.0,
    currency: "eur",
    unit: "hour",
    status: "available",
  },
  {
    id: "gpu_creative",
    name: "GPU Creative",
    gpu: "RTX 4090",
    vram: "24 Go",
    ram: "64 Go",
    storage: "200 Go SSD",
    provider: "runpod",
    useCases: ["génération d'images", "fine-tuning", "Stable Diffusion"],
    cost: 0.9,
    price: 1.8,
    currency: "eur",
    unit: "hour",
    status: "available",
  },
  {
    id: "gpu_pro",
    name: "GPU Pro",
    gpu: "A100 40 Go",
    vram: "40 Go",
    ram: "128 Go",
    storage: "500 Go SSD",
    provider: "vast",
    useCases: ["inference LLM", "entraînement", "multi-GPU"],
    cost: 1.8,
    price: 3.5,
    currency: "eur",
    unit: "hour",
    status: "available",
  },
];

/**
 * Enrichit chaque offre avec la marge brute (ratio + montant absolu).
 */
export function getGpuCatalog() {
  return GPU_OFFERS.map((offer) => {
    const margin = offer.price - offer.cost;
    const marginRatio = offer.price > 0 ? margin / offer.price : 0;
    return {
      ...offer,
      margin: Number(margin.toFixed(2)),
      marginRatio: Number(marginRatio.toFixed(2)),
    };
  });
}

/**
 * Retourne une offre par id, ou `null` si l'offre n'existe pas.
 */
export function getGpuOffer(id) {
  const offer = GPU_OFFERS.find((o) => o.id === id);
  if (!offer) return null;
  return getGpuCatalog().find((o) => o.id === id);
}
