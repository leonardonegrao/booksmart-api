import { FastifyInstance } from "fastify";
import { $ref } from "./book.schema";
import { getUserBooksHandler, updateBookProgressHandler, uploadBookHandler } from "./book.controller";

async function bookRoutes(server: FastifyInstance) {
  server.post(
    "/upload",
    {
      schema: {
        body: $ref("uploadBookSchema"),
        response: {
          201: $ref("createBookResponseSchema"),
        }
      }
    },
    uploadBookHandler
  );

  server.get(
    "/:userId",
    getUserBooksHandler
  );

  server.patch(
    "/:bookId",
    {
      schema: {
        body: $ref("updateBookProgressSchema"),
        response: {
          200: $ref("updateBookProgressResponseSchema"),
        }
      }
    },
    updateBookProgressHandler
  );
}

export default bookRoutes;