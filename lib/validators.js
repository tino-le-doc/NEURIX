import { z } from "zod";

export const AVAILABLE_MODELS = ["gpt-3", "dall-e", "whisper", "codex"];

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email requis").email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Nom trop court")
      .max(64, "Nom trop long"),
    email: z.string().trim().min(1, "Email requis").email("Email invalide"),
    password: z
      .string()
      .min(8, "Mot de passe trop court (8 caractères minimum)")
      .max(128, "Mot de passe trop long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

export const projectSchema = z.object({
  name: z.string().trim().min(1, "Nom du projet requis").max(80),
  description: z.string().trim().max(500).optional().default(""),
});

export const jobSchema = z.object({
  title: z.string().trim().min(1, "Titre requis").max(120),
  model: z.enum(AVAILABLE_MODELS, {
    errorMap: () => ({ message: "Modèle inconnu" }),
  }),
  prompt: z.string().trim().min(1, "Prompt requis").max(4000),
  projectId: z.string().optional(),
});

export const billingEventSchema = z.object({
  service: z.string().min(1),
  amount: z.number().nonnegative(),
  description: z.string().max(200).optional().default(""),
});

/**
 * Helper to extract a flat errors object from a Zod SafeParse failure,
 * suitable for JSON API responses.
 */
export function formatZodErrors(error) {
  const out = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_";
    out[key] = issue.message;
  }
  return out;
}
