import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../utils/AppError";

export interface AuthUserPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
  purpose: string
}

export const ensureAuthenticated = async (
  req: FastifyRequest,
  _reply: FastifyReply
) => {
  const token = req.cookies.token;

  if (!token || token == "") {
    throw new AppError("Usuário não autenticado", 401);
  }

  try {
    const decoded: AuthUserPayload = req.server.jwt.verify(token);
    req.user = { id: decoded.id, email: decoded.email };
  } catch (error) {
    throw new AppError("Token inválido", 401);
  }
};
