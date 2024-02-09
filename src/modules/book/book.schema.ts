import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const uploadBookSchema = z.object({
  name: z.string().min(3),
  userId: z.string(),
  title: z.string(),
  author: z.string(),
  percentageRead: z.number().int().min(0).max(100),
  language: z.string(),
});

const uploadBookResponseSchema = z.object({
  bookSignedUrl: z.string().url(),
  coverSignedUrl: z.string().url(),
});

const createBookSchema = z.object({
  name: z.string().min(3),
  userId: z.string(),
  bookSignedUrl: z.string().url(),
  coverSignedUrl: z.string().url(),
  title: z.string(),
  author: z.string(),
  percentageRead: z.number().int().min(0).max(100),
  language: z.string(),
});

const createBookResponseSchema = z.object({
  id: z.string(),
  filename: z.string(),
  userId: z.string(),
  bookSignedUrl: z.string().url(),
  coverSignedUrl: z.string().url(),
  title: z.string(),
  author: z.string(),
  percentageRead: z.number().int().min(0).max(100),
  language: z.string(),
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