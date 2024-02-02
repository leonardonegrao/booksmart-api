import { FastifyReply, FastifyRequest } from "fastify";
import { UploadBookInput } from "./book.schema";
import { createBook, createSignedUrl } from "./book.service";

export async function uploadBookHandler(request: FastifyRequest<{ Body: UploadBookInput }>, reply: FastifyReply) {
  const body = request.body;

  try {
    const signedUrl = await createSignedUrl(body);
    const book = await createBook({ ...body, signedUrl });

    return reply.code(201).send(book);
  } catch (e) {
    console.error(e);

    // TODO: Validate error and return appropriate response (invalid userId, invalid data)

    return reply.code(500).send({ error: "Error creating signed url" });
  }
}