import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import EmailController from "../controllers/email-controller";

const emailController = new EmailController();

async function emailRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/verify-email",
    async (req: FastifyRequest, reply: FastifyReply) => {
      return emailController.verifyEmail(req, reply);
    }
  );
}

export default emailRoutes;
