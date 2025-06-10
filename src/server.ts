import { app } from "./app";
import { env } from "./validations/env";

const start = () => {
  try {
    app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
      console.log("😎 HTTP Server Running!");
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
