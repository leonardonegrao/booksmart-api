import { FastifyReply, FastifyRequest } from "fastify";
import { UploadBookInput } from "./book.schema";
import { createBook, createSignedUrls, getBookCoverByKey, getBooks } from "./book.service";

export async function uploadBookHandler(request: FastifyRequest<{ Body: UploadBookInput }>, reply: FastifyReply) {
  const body = request.body;

  try {
    const {
      bookSignedUrl,
      bookBucketKey,
      coverSignedUrl,
      coverBucketKey,
    } = await createSignedUrls(body); // const bookFileSignedUrl

    const book = await createBook({
      ...body,
      bookBucketKey,
      coverBucketKey,
    });

    return reply.code(201).send({ ...book, bookSignedUrl, coverSignedUrl });
  } catch (e) {
    console.error(e);

    // TODO: Validate error and return appropriate response (invalid userId, invalid data)

    return reply.code(500).send({ error: "Error creating signed url" });
  }
}

export async function getUserBooksHandler(request: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply) {
  try {
    const books = await getBooks({ userId: request.params.userId });

    return reply.code(200).send(books);
  } catch (e) {
    console.error(e);

    // TODO: Validate error and return appropriate response (invalid userId, invalid data)
    return reply.code(500).send({ error: "Error getting user books" });
  }
}

export async function getBookCoverByKeyHandler(request: FastifyRequest<{ Params: { "*": string } }>, reply: FastifyReply) {
  const bucketKey = request.params["*"];
  console.log("get book cover handler", request.params);

  try {
    const coverSignedUrl = await getBookCoverByKey(bucketKey);

    return reply.code(200).send({ coverSignedUrl });
  } catch (e) {
    console.error(e);

    return reply.code(500).send({ error: "Error getting book cover" });
  }
}