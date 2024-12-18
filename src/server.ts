import { app } from "./app";

const start = () => {
  try {
    app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
      console.log("😎 HTTP Server Running!");
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
