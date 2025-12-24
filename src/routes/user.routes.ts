import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth.middlewares";
import { validateBody } from "../middlewares/validate.middleware";
import { updateUserSchema } from "../validators/updateUser.validator";
import { requireRole} from "../middlewares/requireRole.middleware";
import { updateRoleSchema } from "../validators/updateRole.validator";

export const userRouter = (userController: UserController) => {
  const router = Router();

  router.route("/")
    .get(userController.getAllUsers.bind(userController))
    
  router.route("/me")
    .put(requireAuth, validateBody(updateUserSchema) ,userController.updateMe.bind(userController))
    .get(requireAuth, userController.getMe.bind(userController));

  router.route("/:id")
    .get(requireAuth, userController.getUserByID.bind(userController))

  router.route("/:id/role")
    .patch(requireAuth, requireRole(["superadmin"]), validateBody(updateRoleSchema), userController.updateUserRole.bind(userController))

  return router;
}