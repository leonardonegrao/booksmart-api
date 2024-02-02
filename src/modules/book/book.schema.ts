import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const uploadBookSchema = z.object({
  name: z.string().min(3),
  userId: z.string(),
});

const uploadBookResponseSchema = z.object({
  signedUrl: z.string().url(),
});

const createBookSchema = z.object({
  name: z.string().min(3),
  userId: z.string(),
  signedUrl: z.string().url(),
});

const createBookResponseSchema = z.object({
  id: z.string(),
  filename: z.string(),
  userId: z.string(),
  url: z.string().url(),
});

export type UploadBookInput = z.infer<typeof uploadBookSchema>;
export type CreateBookInput = z.infer<typeof createBookSchema>;

export const { schemas: bookSchemas, $ref } = buildJsonSchemas({
  uploadBookSchema,
  uploadBookResponseSchema,
  createBookSchema,
  createBookResponseSchema,
}, {
  $id: "book",
});