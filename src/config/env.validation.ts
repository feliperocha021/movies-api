import { z } from "zod";
import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

const envSchema = z.object({
  PORT: z.string().default("3000").transform(Number),
  MONGO_URI: z.string().refine((val) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }),
  MONGO_INITDB_ROOT_USERNAME: z.string(),
  MONGO_INITDB_ROOT_PASSWORD: z.string(),
  MONGO_PORT: z.string().default("27017").transform(Number),
  JWT_TOKEN_EXPIRESIN: z.string().default("3600").transform(Number),
  JWT_REFRESH_TOKEN_EXPIRESIN: z.string().default("86400").transform(Number),
  JWT_SECRET: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().default("6379").transform(Number),
  REDIS_INSIGHT_PORT: z.string().default("8001").transform(Number),
  REDIS_URL: z.string().refine((val) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  SUPERADMIN_USERNAME: z.string(),
  SUPERADMIN_EMAIL: z.email(),
  SUPERADMIN_PASSWORD: z.string()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(parsedEnv.error.issues);
  process.exit(1);
}

export const ENV = parsedEnv.data;
