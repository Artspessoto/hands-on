import { FastifyReply, FastifyRequest } from "fastify";
import SessionService from "../services/session-service";
import { sessionSchema } from "../validations/schemas/session-schema";
import { AppError } from "../utils/AppError";

class SessionController {
  private sessionService: SessionService;

  constructor() {
    this.sessionService = new SessionService();
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const {
      success,
      error,
      data: sessionData,
    } = sessionSchema.safeParse(req.body);

    if (!success) {
      throw new AppError(error.errors.map((err) => err.message).join(", "));
    }

    const { token } = await this.sessionService.signIn(sessionData, reply);

    reply.status(200).send({ token });
  }
}

export default SessionController;
