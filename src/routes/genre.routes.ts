import { Router } from "express";
import { GenreController } from "../controllers/genre.controller";
import { requireAuth } from "../middlewares/auth.middlewares";
import { requireRole } from "../middlewares/requireRole.middleware";
import { validateBody } from "../middlewares/validate.middleware";
import { genreSchema } from "../validators/genre.validator";

export const genreRouter = (genreController: GenreController) => {
  const router = Router();

  router.route("/")
    .post(requireAuth, requireRole(["admin", "superadmin"]), validateBody(genreSchema), genreController.createGenre.bind(genreController))
    .get(requireAuth, genreController.getAllGenres.bind(genreController))

  router.route("/:id")
    .get(requireAuth, genreController.getGenreById.bind(genreController))
    .put(requireAuth, requireRole(["admin", "superadmin"]), validateBody(genreSchema), genreController.updateGenre.bind(genreController))
    .delete(requireAuth, requireRole(["admin", "superadmin"]), genreController.deleteGenre.bind(genreController))
  return router
}