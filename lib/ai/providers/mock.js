/**
 * Mock provider used when no API keys are configured. Lets the whole app
 * work end-to-end in development and CI without hitting external services.
 */
export async function runMockJob({ model, prompt }) {
  const trimmed = (prompt || "").slice(0, 120);
  if (model === "dall-e") {
    return {
      output: {
        type: "image",
        url: `https://placehold.co/1024x1024/1F2937/6366F1?text=${encodeURIComponent(
          trimmed
        )}`,
      },
      usage: { costUsd: 0, inputTokens: 0, outputTokens: 0 },
    };
  }
  return {
    output: {
      type: "text",
      text: `🤖 (mock:${model}) Réponse simulée pour: "${trimmed}..."\n\nCe résultat est généré en mode mock car aucune clé API n'est configurée. Définissez OPENAI_API_KEY ou ANTHROPIC_API_KEY dans .env.local pour exécuter de vrais jobs.`,
    },
    usage: { costUsd: 0, inputTokens: trimmed.length, outputTokens: 32 },
  };
}
