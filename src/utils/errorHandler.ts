import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../validations/env";
import { AppError } from "./AppError";

export const errorHandler = (
  error: unknown,
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  const isDev = env.NODE_ENV == "dev" || env.NODE_ENV == "test";

  if (error instanceof AppError) {
    reply.status(error.statusCode).send({
      status: "error",
      message: isDev ? error.message : "Ocorreu um erro na sua solicitação.",
    });
  }

  if (!isDev) {
    console.error(error);
  }

  const errorMessage =
    error instanceof Error ? error.message : "Erro desconhecido";

  reply.status(500).send({
    status: "error",
    message: isDev
      ? errorMessage
      : "Ocorreu um erro interno. Tente novamente mais tarde.",
  });
};
