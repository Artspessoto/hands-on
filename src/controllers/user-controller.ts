import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../services/user-service";
import { userSchema } from "../validations/schemas/user-schema";
import { AppError } from "../utils/AppError";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const { success, error, data } = userSchema.safeParse(req.body);

    if (!success) {
      throw new AppError(error.errors.map((err) => err.message).join(", "));
    }

    const { name, email, cpf, role, password } = data;

    await this.userService.createUser({ name, email, cpf, role, password });

    return reply.status(201).send({ message: "Usuário criado 😎👍" });
  }
}

export default UserController;
