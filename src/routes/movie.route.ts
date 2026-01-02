import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { createMovieSchema } from "../validators/movie.validator";
import { requireAuth } from "../middlewares/auth.middlewares";
import { requireRole } from "../middlewares/requireRole.middleware";
import { updateMovieSchema } from "../validators/updateMovie.validator";
import { createReviewSchema } from "../validators/review.validator";
import { updateReviewSchema } from "../validators/updateReview.validator";

export const movieRouter = (movieController: MovieController) => {
  const router = Router();

  router.route("/")
    .get(movieController.getAllMovies.bind(movieController))
    .post(requireAuth, requireRole(["admin", "superadmin"]), validateBody(createMovieSchema), movieController.createMovie.bind(movieController))

  router.route("/:id")
    .get(movieController.getMovieById.bind(movieController))
    .put(requireAuth, requireRole(["admin", "superadmin"]), validateBody(updateMovieSchema), movieController.updateMovie.bind(movieController))
    .delete(requireAuth, requireRole(["admin", "superadmin"]), movieController.deleteMovie.bind(movieController))

  router.route("/:id/reviews")
    .post(requireAuth, validateBody(createReviewSchema), movieController.createMovieReview.bind(movieController))
    .put(requireAuth, validateBody(updateReviewSchema), movieController.updateMovieReview.bind(movieController))
    .delete(requireAuth, requireRole(["admin", "superadmin"]), movieController.deleteMovieReview.bind(movieController))
  return router;
}
