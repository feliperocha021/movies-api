import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Request } from "express";
import { User } from "../models/user.model";
import { ENV } from "../config/env.validation";

function cookieExtractor(req: Request) {
  return req?.cookies?.refreshToken || null;
}

export const refreshStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: ENV.JWT_SECRET
  },
  async (payload, done) => {
    try {
      return done(null, payload);
    } catch (err) {
      return done(err, false);
    }
  }
);
