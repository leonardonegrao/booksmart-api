import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";

import { env } from "../utils/env";

import userRoutes from "../modules/user/user.route";
import { userSchemas } from "../modules/user/user.schema";

import bookRoutes from "../modules/book/book.route";
import { bookSchemas } from "../modules/book/book.schema";

export const server = fastify();

server.register(fjwt, {
  secret: env.JWT_SECRET
});

server.decorate("auth", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (e) {
    return reply.send(e);
  }
});

server.get("/healthcheck", async () => {
  return { status: "ok" };
});

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  for (const schema of bookSchemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "/users" });
  server.register(bookRoutes, { prefix: "/books" });

  try {
    await server.listen({ port: 3333, host: "0.0.0.0" });
    console.log("Server is running on port 3333");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();