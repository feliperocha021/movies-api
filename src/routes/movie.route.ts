import { Router } from "express";
import { MovieController } from "../controllers/movie.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { createMovieSchema } from "../validators/movie.validator.js";
import { requireAuth } from "../middlewares/auth.middlewares.js";
import { requireRole } from "../middlewares/requireRole.middleware.js";
import { updateMovieSchema } from "../validators/updateMovie.validator.js";
import { createReviewSchema } from "../validators/review.validator.js";
import { updateReviewSchema } from "../validators/updateReview.validator.js";

export const movieRouter = (movieController: MovieController) => {
  const router = Router();

  router.route("/")
    .get(movieController.getAllMovies.bind(movieController))
    .post(requireAuth, requireRole(["admin", "superadmin"]), validateBody(createMovieSchema), movieController.createMovie.bind(movieController))

  router.route("/latest")
    .get(movieController.getNewMovies.bind(movieController))

  router.route("/top")
    .get(movieController.getTopMovies.bind(movieController))

  router.route("/random")
    .get(movieController.getRandomMovies.bind(movieController))

  router.route("/:id")
    .get(movieController.getMovieById.bind(movieController))
    .put(requireAuth, requireRole(["admin", "superadmin"]), validateBody(updateMovieSchema), movieController.updateMovie.bind(movieController))
    .delete(requireAuth, requireRole(["admin", "superadmin"]), movieController.deleteMovie.bind(movieController))

  router.route("/:id/reviews")
    .post(requireAuth, validateBody(createReviewSchema), movieController.createMovieReview.bind(movieController))
    .put(requireAuth, validateBody(updateReviewSchema), movieController.updateMovieReview.bind(movieController))

  router.route("/:movieId/reviews/:reviewId")
    .delete(requireAuth, requireRole(["admin", "superadmin"]), movieController.deleteMovieReview.bind(movieController))
  return router;
}
