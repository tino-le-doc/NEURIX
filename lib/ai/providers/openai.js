import OpenAI from "openai";

let _client = null;
function client() {
  if (_client) return _client;
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  _client = new OpenAI({ apiKey: key });
  return _client;
}

export const MODEL_MAP = {
  "gpt-3": "gpt-4o-mini",
  codex: "gpt-4o",
  "dall-e": "dall-e-3",
  whisper: "whisper-1",
};

/**
 * Run a Neurix job through OpenAI. Returns a normalized job result:
 *   { output, usage: { inputTokens, outputTokens, costUsd } }
 */
export async function runOpenAIJob({ model, prompt }) {
  const c = client();
  if (!c) {
    throw new Error("OpenAI indisponible: OPENAI_API_KEY manquant");
  }

  const mapped = MODEL_MAP[model];
  if (!mapped) {
    throw new Error(`Modèle OpenAI inconnu: ${model}`);
  }

  // --- Image generation --------------------------------------------------
  if (model === "dall-e") {
    const resp = await c.images.generate({
      model: mapped,
      prompt,
      size: "1024x1024",
      n: 1,
    });
    return {
      output: { type: "image", url: resp.data?.[0]?.url },
      usage: { costUsd: 0.04, inputTokens: 0, outputTokens: 0 },
    };
  }

  // --- Audio transcription ----------------------------------------------
  if (model === "whisper") {
    // `prompt` is expected to be a URL to the audio asset. In a real app
    // we'd stream the file directly; here we return a helpful error if the
    // caller supplies raw text instead of a URL.
    throw new Error(
      "Whisper: upload d'audio non pris en charge dans cette version. Utiliser /api/jobs/upload."
    );
  }

  // --- Chat / text generation -------------------------------------------
  const completion = await c.chat.completions.create({
    model: mapped,
    messages: [
      {
        role: "system",
        content:
          model === "codex"
            ? "Tu es un assistant expert en programmation. Fournis du code concis et correct."
            : "Tu es un assistant Neurix utile, concis et précis.",
      },
      { role: "user", content: prompt },
    ],
  });

  const msg = completion.choices?.[0]?.message?.content || "";
  const usage = completion.usage || {};
  return {
    output: { type: "text", text: msg },
    usage: {
      inputTokens: usage.prompt_tokens || 0,
      outputTokens: usage.completion_tokens || 0,
      costUsd: estimateCost(mapped, usage),
    },
  };
}

// Very rough cost estimate for reporting — refresh as OpenAI prices change.
function estimateCost(model, usage) {
  const RATES = {
    "gpt-4o-mini": { in: 0.00015, out: 0.0006 }, // per 1K tokens
    "gpt-4o": { in: 0.0025, out: 0.01 },
  };
  const r = RATES[model];
  if (!r) return 0;
  return (
    ((usage.prompt_tokens || 0) * r.in) / 1000 +
    ((usage.completion_tokens || 0) * r.out) / 1000
  );
}
