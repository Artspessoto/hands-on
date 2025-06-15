import { FastifyRequest, FastifyReply } from "fastify";
import { querySchema } from "../validations/schemas/query-schema";
import { AppError } from "../utils/AppError";
import UserRepository from "../repositories/user-repository";
import { AuthUserPayload } from "../middlewares/ensureAuthenticated";

class EmailController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async verifyEmail(req: FastifyRequest, reply: FastifyReply) {
    const { success, error, data } = querySchema.safeParse(req.query);

    if (!success) {
      throw new AppError(error.errors.map((err) => err.message).join(", "));
    }

    const { token } = data;

    try {
      const decoded: AuthUserPayload = req.server.jwt.verify(token);

      if (decoded.purpose !== "email_verification") {
        throw new AppError("Token inválido para verificação de e-mail", 401);
      }

      const userId = decoded.id;

      if (!userId) {
        throw new AppError("Token inválido: id de usuário não encontrado", 401);
      }

      await this.userRepository.verifyUserEmail(userId);

      return reply
        .status(200)
        .send({ message: "E-mail verificado com sucesso ✅" });
    } catch (err) {
      console.error(err);
      throw new AppError("Token inválido ou expirado", 401);
    }
  }
}

export default EmailController;
