import passport from "passport";
import { accessStrategy } from "./jwt.strategy.js";
import { refreshStrategy } from "./jwt-refresh.strategy.js";

passport.use("jwt-access", accessStrategy);
passport.use("jwt-refresh", refreshStrategy);

export default passport;
