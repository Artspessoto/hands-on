import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  ENCRYPTION_KEY: z
    .string()
    .length(32, "A ENCRYPTION_KEY deve ter exatamente 32 caracteres (bytes)"),
  IV_KEY: z
    .string()
    .length(16, "A IV_KEY deve ter exatamente 16 caracteres (bytes)"),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
