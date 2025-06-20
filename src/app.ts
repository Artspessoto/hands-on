import fastify from "fastify";
import routes from "./routes";
import { errorHandler } from "./utils/errorHandler";
import cors from "@fastify/cors";
import { cookiePlugin } from "./plugins/cookiePlugin";
import { jwtPlugin } from "./plugins/jwtPlugin";
import { swaggerPlugin } from "./plugins/swaggerPlugin";

export const app = fastify();

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

cookiePlugin(app);
jwtPlugin(app);
swaggerPlugin(app);

app.register(routes);
app.setErrorHandler(errorHandler);
