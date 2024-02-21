import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const uploadBookSchema = z.object({
  name: z.string().min(3),
  userId: z.string(),
  title: z.string(),
  author: z.string(),
  percentageRead: z.number().int().min(0).max(100),
  lastLocation: z.string(),
  language: z.string(),
});

const uploadBookResponseSchema = z.object({
  bookSignedUrl: z.string().url(),
  bookBucketKey: z.string(),
  coverSignedUrl: z.string().url(),
  coverBucketKey: z.string(),
});

const createBookSchema = z.object({
  name: z.string().min(3),
  userId: z.string(),
  bookBucketKey: z.string(),
  coverBucketKey: z.string(),
  title: z.string(),
  author: z.string(),
  percentageRead: z.number().int().min(0).max(100),
  lastLocation: z.string(),
  language: z.string(),
});

const createBookResponseSchema = z.object({
  id: z.string(),
  filename: z.string(),
  userId: z.string(),
  bookSignedUrl: z.string().url(),
  bookBucketKey: z.string(),
  coverSignedUrl: z.string().url(),
  coverBucketKey: z.string(),
  title: z.string(),
  author: z.string(),
  percentageRead: z.number().int().min(0).max(100),
  lastLocation: z.string(),
  language: z.string(),
});

const updateBookProgressSchema = z.object({
  percentageRead: z.number().int().min(0).max(100),
  lastLocation: z.string(),
});

const updateBookProgressResponseSchema = z.object({
  id: z.string(),
  percentageRead: z.number().int().min(0).max(100),
  lastLocation: z.string(),
});

export type UploadBookInput = z.infer<typeof uploadBookSchema>;
export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookProgressInput = z.infer<typeof updateBookProgressSchema>;

export const { schemas: bookSchemas, $ref } = buildJsonSchemas({
  uploadBookSchema,
  uploadBookResponseSchema,
  createBookSchema,
  createBookResponseSchema,
  updateBookProgressSchema,
  updateBookProgressResponseSchema,
}, {
  $id: "book",
});