import { runOpenAIJob } from "./providers/openai";
import { runAnthropicJob } from "./providers/anthropic";
import { runMockJob } from "./providers/mock";
import logger from "@/lib/logger";

/**
 * Pick the best provider for a given model given the current env configuration.
 * Priority:
 *   1. Respect AI_DEFAULT_PROVIDER if it's set and has a key
 *   2. Route dall-e / whisper to openai (only provider that supports them)
 *   3. Use the first provider whose key is present
 *   4. Fall back to the mock provider
 */
function chooseProvider(model) {
  const preferred = (process.env.AI_DEFAULT_PROVIDER || "").toLowerCase();
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;

  if (model === "dall-e" || model === "whisper") {
    return hasOpenAI ? "openai" : "mock";
  }

  if (preferred === "openai" && hasOpenAI) return "openai";
  if (preferred === "anthropic" && hasAnthropic) return "anthropic";
  if (preferred === "mock") return "mock";

  if (hasOpenAI) return "openai";
  if (hasAnthropic) return "anthropic";
  return "mock";
}

/**
 * Execute a Neurix job against the appropriate provider and return a
 * normalized result envelope: { provider, output, usage }.
 */
export async function runJob({ model, prompt }) {
  const provider = chooseProvider(model);
  const started = Date.now();
  try {
    let result;
    if (provider === "openai") result = await runOpenAIJob({ model, prompt });
    else if (provider === "anthropic")
      result = await runAnthropicJob({ model, prompt });
    else result = await runMockJob({ model, prompt });

    const durationMs = Date.now() - started;
    logger.info("job executed", {
      provider,
      model,
      durationMs,
      costUsd: result.usage?.costUsd,
    });

    return { provider, durationMs, ...result };
  } catch (err) {
    logger.error("job execution failed", {
      provider,
      model,
      message: err.message,
    });
    throw err;
  }
}
