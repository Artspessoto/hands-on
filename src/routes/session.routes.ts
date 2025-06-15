import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import SessionController from "../controllers/session-controller";
import fromZodSchema from "zod-to-json-schema";
import { sessionSchema } from "../validations/schemas/session-schema";

const sessionController = new SessionController();
const sessionBodySchema = fromZodSchema(sessionSchema);

async function sessionRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/",
    {
      schema: {
        body: sessionBodySchema,
        response: {
          200: {
            type: "object",
            properties: {
              token: { type: "string" },
            },
          },
        },
        description: "Autentica um usuário no app",
        tags: ["Sessions"],
      },
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return sessionController.create(req, reply);
    }
  );
}

export default sessionRoutes;
