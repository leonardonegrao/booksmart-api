import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateBookProgressInput, UploadBookInput } from "./book.schema";
import { createBook, createSignedUrls, getBooks, updateBookProgress } from "./book.service";

export async function uploadBookHandler(request: FastifyRequest<{ Body: UploadBookInput }>, reply: FastifyReply) {
  const body = request.body;

  try {
    const {
      bookSignedUrl,
      bookBucketKey,
      coverSignedUrl,
      coverBucketKey,
    } = await createSignedUrls(body);

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

export async function updateBookProgressHandler(
  request: FastifyRequest<{ Params: { bookId: string }, Body: UpdateBookProgressInput }>,
  reply: FastifyReply,
) {
  const body = request.body;
  const bookId = request.params.bookId;

  try {
    const book = await updateBookProgress({
      id: bookId,
      percentageRead: body.percentageRead,
      lastLocation: body.lastLocation
    });

    return reply.code(200).send(book);
  } catch (e) {
    console.error(e);
  }
}