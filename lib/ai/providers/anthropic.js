import Anthropic from "@anthropic-ai/sdk";

let _client = null;
function client() {
  if (_client) return _client;
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  _client = new Anthropic({ apiKey: key });
  return _client;
}

export const MODEL_MAP = {
  "gpt-3": "claude-haiku-4-5-20251001",
  codex: "claude-sonnet-4-5",
};

export async function runAnthropicJob({ model, prompt }) {
  const c = client();
  if (!c) {
    throw new Error("Anthropic indisponible: ANTHROPIC_API_KEY manquant");
  }

  const mapped = MODEL_MAP[model];
  if (!mapped) {
    throw new Error(
      `Modèle non supporté par Anthropic: ${model}. Utiliser gpt-3 ou codex.`
    );
  }

  const message = await c.messages.create({
    model: mapped,
    max_tokens: 1024,
    system:
      model === "codex"
        ? "Tu es un assistant expert en programmation. Fournis du code concis et correct."
        : "Tu es un assistant Neurix utile, concis et précis.",
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content
    ?.filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  return {
    output: { type: "text", text },
    usage: {
      inputTokens: message.usage?.input_tokens || 0,
      outputTokens: message.usage?.output_tokens || 0,
      costUsd: estimateCost(mapped, message.usage),
    },
  };
}

function estimateCost(model, usage) {
  const RATES = {
    "claude-haiku-4-5-20251001": { in: 0.0008, out: 0.004 },
    "claude-sonnet-4-5": { in: 0.003, out: 0.015 },
  };
  const r = RATES[model];
  if (!r) return 0;
  return (
    ((usage?.input_tokens || 0) * r.in) / 1000 +
    ((usage?.output_tokens || 0) * r.out) / 1000
  );
}
