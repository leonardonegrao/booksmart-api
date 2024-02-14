import { FastifyInstance } from "fastify";
import { $ref } from "./book.schema";
import { getBookCoverByKeyHandler, getUserBooksHandler, uploadBookHandler } from "./book.controller";

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
    "/covers/*",
    getBookCoverByKeyHandler
  );

  server.get(
    "/:userId",
    getUserBooksHandler
  );

  server.setNotFoundHandler((request) => {
    console.log("not found error", request.url);
    return "Route not found";
  });
}

export default bookRoutes;