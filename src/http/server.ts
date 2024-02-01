import fastify from "fastify";

const app = fastify();

app.get("/", () => {
  return { hello: "world" };
});

app.listen({
  port: 3333,
  host: "0.0.0.0",
}).then(() => {
  console.log("HTTP server running on port 3333");
});