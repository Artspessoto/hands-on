import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserController from "../controllers/user-controller";

const userController = new UserController();

async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/", async (req: FastifyRequest, reply: FastifyReply) => {
    return userController.create(req, reply);
  });
}

export default userRoutes;
