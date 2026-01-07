import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { ENV } from "../config/env.validation.js";
import { AccessTokenPayload, RefreshTokenPayload } from "../interfaces/user-payload.interface.js";

export function generateAccessToken(userId: string, username: string, role: "user" | "admin" | "superadmin") {
  const payload: AccessTokenPayload = { sub: userId, username, role };
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: ENV.JWT_TOKEN_EXPIRESIN });
}

export function generateRefreshToken(userId: string) {
  const jti = uuidv4();
  const payload: RefreshTokenPayload = { sub: userId, jti };
  const token = jwt.sign(payload, ENV.JWT_SECRET!, { expiresIn: ENV.JWT_REFRESH_TOKEN_EXPIRESIN });
  return { token, jti };
}
