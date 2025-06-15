import { FastifyInstance } from "fastify";
import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";
import { AppError } from "../utils/AppError";

async function routes(fastify: FastifyInstance) {
  fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(sessionRoutes, { prefix: "/sessions" });
  fastify.get("/force-error", async () => {
    throw new AppError("Erro proposital!");
  });
  fastify.get("/", async () => {
    return { message: "hands-on API" };
  });
}

export default routes;
