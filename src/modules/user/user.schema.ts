import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userBaseSchema = {
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).email(),
  fullname: z.string(),
  username: z.string(),
};

const createUserSchema = z.object({
  ...userBaseSchema,
  password: z.string(
    {
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }
  ).min(8),
});

const createUserResponseSchema = z.object({
  ...userBaseSchema,
  id: z.string(),
  createdAt: z.string(),
});

const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).email(),
  password: z.string(
    {
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }
  ).min(8),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
});