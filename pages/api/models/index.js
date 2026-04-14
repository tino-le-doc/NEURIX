import { apiHandler } from "@/lib/apiHandler";
import { AVAILABLE_MODELS } from "@/lib/validators";

const CATALOG = [
  {
    id: "gpt-3",
    name: "GPT-3",
    category: "Génération de texte",
    description: "Modèle de langage polyvalent pour la rédaction et le dialogue.",
    pricing: { unit: "1K tokens", amount: 0.02 },
    status: "available",
    tags: ["text", "chat", "summary"],
  },
  {
    id: "dall-e",
    name: "DALL-E",
    category: "Génération d'images",
    description: "Création d'images à partir de descriptions textuelles.",
    pricing: { unit: "image", amount: 0.04 },
    status: "available",
    tags: ["image", "creative"],
  },
  {
    id: "whisper",
    name: "Whisper",
    category: "Transcription audio",
    description: "Transcription et traduction audio multilingue.",
    pricing: { unit: "minute", amount: 0.006 },
    status: "available",
    tags: ["audio", "speech"],
  },
  {
    id: "codex",
    name: "Codex",
    category: "Génération de code",
    description: "Génération et complétion de code dans plusieurs langages.",
    pricing: { unit: "1K tokens", amount: 0.02 },
    status: "available",
    tags: ["code", "dev"],
  },
];

export default apiHandler(
  {
    GET: async (_req, res) => {
      return res.status(200).json({
        models: CATALOG,
        supported: AVAILABLE_MODELS,
      });
    },
  },
  { auth: true }
);
