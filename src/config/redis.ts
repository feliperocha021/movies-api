import Redis from "ioredis";
import { ENV } from "./env.validation";

export const redisClient = new Redis({
  host: ENV.REDIS_HOST,
  port: ENV.REDIS_PORT,
});

redisClient.on("connect", () => {
  console.log("Redis conectado com sucesso");
});

redisClient.on("error", (err) => {
  console.error("Erro no Redis:", err);
});
