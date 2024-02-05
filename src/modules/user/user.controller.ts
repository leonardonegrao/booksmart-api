import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { server } from "../../http/server";

export async function registerUserHandler(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (e) {
    console.error(e);

    // TODO: Validate error and return appropriate response (unique fields, invalid data)

    return reply.code(500).send({ error: "Error creating user" });
  }
}

export async function loginHandler(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
  const body = request.body;

  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.code(401).send({ error: "Invalid email or password" });
  }

  const correctPassword = verifyPassword(body.password, user.password);

  if (!correctPassword) {
    return reply.code(401).send({ error: "Invalid email or password" });
  }

  const { email, fullname, username, id } = user;

  return {
    accessToken: server.jwt.sign({ email, fullname, username, id }),
    email,
    fullname,
    username,
    id,
  };
}