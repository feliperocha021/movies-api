import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/auth.middlewares.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { updateUserSchema } from "../validators/updateUser.validator.js";
import { requireRole} from "../middlewares/requireRole.middleware.js";
import { updateRoleSchema } from "../validators/updateRole.validator.js";

export const userRouter = (userController: UserController) => {
  const router = Router();

  router.route("/")
    .get(requireAuth, requireRole(["admin", "superadmin"]), userController.getAllUsers.bind(userController))
    
  router.route("/me")
    .put(requireAuth, validateBody(updateUserSchema) ,userController.updateMe.bind(userController))
    .get(requireAuth, userController.getMe.bind(userController));

  router.route("/:id")
    .get(requireAuth, userController.getUserByID.bind(userController))

  router.route("/:id/role")
    .patch(requireAuth, requireRole(["superadmin"]), validateBody(updateRoleSchema), userController.updateUserRole.bind(userController))

  return router;
}