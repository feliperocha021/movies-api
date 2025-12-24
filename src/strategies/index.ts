import passport from "passport";
import { accessStrategy } from "./jwt.strategy";
import { refreshStrategy } from "./jwt-refresh.strategy";

passport.use("jwt-access", accessStrategy);
passport.use("jwt-refresh", refreshStrategy);

export default passport;
