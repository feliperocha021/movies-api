import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { createUserSchema } from "../validators/user.validator.js";
import { requireAuth, requireAuthRefresh } from "../middlewares/auth.middlewares.js";
import { loginUserSchema } from "../validators/login.validator.js";
import { changePasswordUserSchema } from "../validators/changePasswordUser.validator.js";

export const authRouter = (authController: AuthController) => {
  const router = Router();

  router.route("/signup")
    .post(validateBody(createUserSchema), authController.signup.bind(authController))

  router.route("/login")
    .post(validateBody(loginUserSchema), authController.login.bind(authController));

  router.route("/refresh")
    .post(requireAuthRefresh, authController.refresh.bind(authController));

  router.route("/logout")
    .post(requireAuth, requireAuthRefresh, authController.logout.bind(authController));

  router.route("/logout-all")
    .post(requireAuth, authController.logoutAll.bind(authController));
  
  router.route("/change-password")
    .put(requireAuth, validateBody(changePasswordUserSchema), authController.changePassword.bind(authController));
  return router;
};

