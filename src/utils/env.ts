import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  // R2 Integration
  R2_TOKEN: z.string(),
  R2_ACCESS_KEY: z.string(),
  R2_SECRET_KEY: z.string(),
  R2_ENDPOINT: z.string().url(),
  R2_BUCKET: z.string(),
});

export const env = envSchema.parse(process.env);