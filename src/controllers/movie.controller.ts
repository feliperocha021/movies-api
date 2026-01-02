import { NextFunction, Request, Response } from "express";
import { MovieService } from "../services/movie.service";
import { MovieRequestDTO } from "../dtos/request/movie.dto";
import { toMovieDTO } from "../mappers/movie.mapper";
import { ReviewDTO } from "../dtos/request/review.dto";
import { AccessTokenPayload } from "../interfaces/user-payload.interface";

export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  async getAllMovies (req: Request, res: Response, next: NextFunction) {
    try {
      const movies = await this.movieService.getAllMovies();
      const formatedMovies = movies.map((movie) => toMovieDTO(movie));

      return res.status(200).json({
        success: true,
        message: "Movies found successfully",
        data: {
          genres: formatedMovies,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async createMovie (req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as MovieRequestDTO;
      const movie = await this.movieService.createMovie(data);
      const formatedMovie = toMovieDTO(movie)

      return res.status(201).json({
        success: true,
        message: "Movies created successfully",
        data: {
          movie: formatedMovie,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getMovieById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id: movieId } = req.params;
      const movie = await this.movieService.getMovieById(movieId);
      const formatedMovie = toMovieDTO(movie);
      return res.status(200).json({
        success: true,
        message: "Movie found successfully",
        data: {
          movie: formatedMovie,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateMovie (req: Request<{id: string}, {}, MovieRequestDTO>, res: Response, next: NextFunction) {
    try {
      const { id: movieId } = req.params;
      const data = req.body;
      const movie = await this.movieService.updateMovie(movieId, data);
      const formatedMovie = toMovieDTO(movie);

      return res.status(200).json({
        success: true,
        message: "Movie updated successfully",
        data: {
          movie: formatedMovie,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteMovie (req: Request<{ id: string }, {}, {}>, res: Response, next: NextFunction) {
    try {
      const { id: movieId } = req.params;
      await this.movieService.deleteMovie(movieId);

      return res.status(200).json({
        success: true,
        message: "Movie deleted successfully",
        data: null,
      });
    } catch(err) {
      next(err);
    }
  }

  async createMovieReview (req: Request<{id: string}, {}, ReviewDTO>, res: Response, next: NextFunction) {
    try {
      const { id: movieId } = req.params;
      const userId = (req.user as AccessTokenPayload).sub;
      const data = req.body;
      const movie = await this.movieService.createMovieReview(movieId, userId, data);
      const formatedMovie = toMovieDTO(movie);
      const userReview = formatedMovie.reviews.find(r => r.user.toString() === userId);

      return res.status(201).json({
        success: true,
        message: "Review created successfully",
        data: {
          review: userReview,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateMovieReview (req: Request<{id: string}, {}, ReviewDTO>, res: Response, next: NextFunction) {
    try {
      const { id: movieId } = req.params;
      const userId = (req.user as AccessTokenPayload).sub;
      const data = req.body;
      const movie = await this.movieService.updateMovieReview(movieId, userId, data);
      const formatedMovie = toMovieDTO(movie);
      const userReview = formatedMovie.reviews.find(r => r.user.toString() === userId);

      return res.status(200).json({
        success: true,
        message: "Review updated successfully",
        data: {
          review: userReview,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteMovieReview (req: Request<{id: string}, {}, ReviewDTO>, res: Response, next: NextFunction) {
    try {
      const { id: movieId } = req.params;
      const data  = req.body;
      const movie = await this.movieService.deleteMovieReview(movieId, data.id);
      const formatedMovie = toMovieDTO(movie);
      const reviews = formatedMovie.reviews;

      return res.status(200).json({
        success: true,
        message: "Review deleted successfully",
        data: {
          reviews,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
