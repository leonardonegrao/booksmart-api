import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";

import userRoutes from "../modules/user/user.route";
import { userSchemas } from "../modules/user/user.schema";
import { env } from "../utils/env";

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

  server.register(userRoutes, { prefix: "/users" });

  try {
    await server.listen({ port: 3333, host: "0.0.0.0" });
    console.log("Server is running on port 3333");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();