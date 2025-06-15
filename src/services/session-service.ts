import { FastifyReply } from "fastify";
import SessionRepository from "../repositories/session-repository";
import { Session, sessionSchema } from "../validations/schemas/session-schema";
import { AppError } from "../utils/AppError";
import { compare } from "bcrypt";
import { app } from "../app";
import { setJwtCookie } from "../plugins/cookiePlugin";

class SessionService {
  private sessionRepository: SessionRepository;

  constructor() {
    this.sessionRepository = new SessionRepository();
  }

  public async signIn(
    data: Session,
    reply: FastifyReply
  ): Promise<{ token: string }> {
    const { success, error, data: sessionData } = sessionSchema.safeParse(data);

    if (!success) {
      throw new AppError(error.errors.map((err) => err.message).join(", "));
    }

    const user = await this.sessionRepository.findByEmail(
      sessionData.email
    );

    if (!user) {
      throw new AppError("E-mail e/ou senha incorretos", 401);
    }

    const passwordMatched = await compare(sessionData.password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorretos", 401);
    }

    const loginPayload = {
      id: user.id,
      email: user.email,
    };

    const token = app.jwt.sign(loginPayload);
    setJwtCookie(reply, token);

    return { token: token };
  }
}

export default SessionService;
