import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserController from "../controllers/user-controller";
import fromZodSchema from "zod-to-json-schema";
import { publicUserSchema } from "../validations/schemas/user-schema";

const userController = new UserController();
const userBodySchema = fromZodSchema(publicUserSchema);

async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/",
    {
      schema: {
        body: userBodySchema,
        response: { 201: userBodySchema },
        description: "Cria um usuário (voluntário ou doador)",
        tags: ["Users"],
      },
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      return userController.create(req, reply);
    }
  );
}

export default userRoutes;
