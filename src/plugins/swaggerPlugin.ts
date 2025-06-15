import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";

export const swaggerPlugin = async (app: FastifyInstance) => {
  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Hands-on API",
        description: "Documentação da API Hands-on",
        version: "1.0.0",
        contact: {
          email: "artspessoto@gmail.com",
          name: "Arthur Martins Lopes Spessoto",
        },
      },
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
    },
  });
};
