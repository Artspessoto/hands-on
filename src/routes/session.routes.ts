import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import SessionController from "../controllers/session-controller";

const sessionController = new SessionController();

async function sessionRoutes(fastify: FastifyInstance) {
  fastify.post("/", async (req: FastifyRequest, reply: FastifyReply) => {
    return sessionController.create(req, reply);
  });
}

export default sessionRoutes;
