import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { ENV } from "../config/env.validation";

export const accessStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ENV.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      return done(null, payload);
    } catch (err) {
      return done(err, false);
    }
  }
);
