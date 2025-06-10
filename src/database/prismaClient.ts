import { PrismaClient } from "@prisma/client";
import { env } from "../validations/env";

const isDev = env.NODE_ENV == "dev";

const prisma = new PrismaClient({
  log: isDev
    ? [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
      ]
    : [{ emit: "event", level: "error" }],
});

if (isDev) {
  prisma.$on("query", (e) => {
    console.log("🟢 Query:" + e.query);
    console.log("🟡 Params:" + e.params);
    console.log("⏱ Duration:" + e.duration + "ms");
  });
}

prisma.$on("error", (e) => {
  console.error("🔴 Prisma Error:", e.message);
});

export default prisma;
