import { FastifyInstance } from "fastify";
import { env } from "../validations/env";
import { AppError } from "../utils/AppError";
import fjwt from "@fastify/jwt";

export const jwtPlugin = async (app: FastifyInstance) => {
  if (!env.JWT_SECRET) {
    throw new AppError(
      "Im teapot and i dont have access to JWT_SECRET value",
      418
    );
  }

  await app.register(fjwt, {
    secret: env.JWT_SECRET as string,
    sign: {
      expiresIn: "8h",
    },
  });
};
