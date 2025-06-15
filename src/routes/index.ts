import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";
import { AppError } from "../utils/AppError";
import { env } from "../validations/env";

async function routes(fastify: FastifyInstance) {
  fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(sessionRoutes, { prefix: "/sessions" });
  fastify.get(
    "/force-error",
    {
      schema: {
        response: {
          400: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
        description: "Endpoint para forçar um erro proposital (bad request)",
        tags: ["Test"],
      },
    },
    async () => {
      throw new AppError("Erro proposital!");
    }
  );
  fastify.get(
    "/health",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              name: { type: "string" },
              version: { type: "string" },
              status: { type: "string" },
              uptime: { type: "number" },
              timestamp: { type: "number" },
            },
          },
        },
        description: "Health check da API",
        tags: ["Health"],
      },
    },
    async () => {
      return {
        name: "Hands-on API",
        version: "1.0.0",
        status: "running",
        uptime: process.uptime(),
        timestamp: Date.now(),
      };
    }
  );
  fastify.get(
    "/version",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              version: { type: "string" },
              environment: { type: "string", format: "date-time" },
              buildDate: { type: "string" },
            },
          },
        },
        description: "Retorna a versão da API e informações de build",
        tags: ["Info"],
      },
    },
    async () => {
      return {
        version: "1.0.0",
        environment: env.NODE_ENV || "dev",
        buildDate: new Date().toISOString(),
      };
    }
  );
  fastify.get("/", async (_req: FastifyRequest, reply: FastifyReply) => {
    reply.redirect("/docs");
  });
}

export default routes;
