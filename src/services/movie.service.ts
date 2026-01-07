import { ReviewDTO } from "../dtos/request/review.dto.js";
import { BadRequestError, NotFoundError } from "../errors/error.js";
import { Movie } from "../models/movie.model.js";
import { MovieRequestDTO } from "../dtos/request/movie.dto.js";

export class MovieService {
  async getAllMovies() {
    return await Movie.find().sort({ createdAt: -1 });
  }

  async createMovie(data: MovieRequestDTO) {
    return await Movie.create(data);
  }

  async getMovieById(movieId: string) {
    const movie = await Movie.findById(movieId);
    if (!movie) throw new NotFoundError("Movie not found");
    return movie;
  }

  async updateMovie(movieId: string, data: MovieRequestDTO) {
    const movie = await Movie.findById(movieId);
    if (!movie) throw new NotFoundError("Movie not found");

    movie.name = data.name;
    movie.year = data.year;
    movie.details = data.details;
    movie.image = data.image;
    movie.cast = data.cast;

    await movie.save();
    return movie;
  }
  
  async deleteMovie(movieId: string) {
    const result = await Movie.deleteOne({ _id: movieId });
    if (result.deletedCount === 0) throw new NotFoundError("Movie not found");

    return true;
  }

  async createMovieReview(movieId: string, userId: string, data: ReviewDTO) {
    const movie = await Movie.findById(movieId);
    if (!movie) throw new NotFoundError("Movie not found");

    const existingReview = movie.reviews.find(r => r.user.toString() === userId);

    if (existingReview) throw new BadRequestError("This review not found");

    movie.reviews.push({
      name: data.name,
      rating: data.rating,
      comment: data.comment,
      user: userId,
    });

    movie.numReviews = movie.reviews.length;
    await movie.save();
    return movie;
  }

  async updateMovieReview(movieId: string, userId: string, data: ReviewDTO) {
    const movie = await Movie.findById(movieId);
    if (!movie) throw new NotFoundError("Movie not found");

    const existingReview = movie.reviews.find(r => r.user.toString() === userId);

    if (!existingReview) throw new NotFoundError("This review does not exist");

    existingReview.name = data.name;
    existingReview.rating = data.rating;
    existingReview.comment = data.comment;

    movie.numReviews = movie.reviews.length;
    await movie.save();
    return movie;
  }

  async deleteMovieReview(movieId: string, reviewId: string) {
    const movie = await Movie.findById(movieId);
    if (!movie) throw new NotFoundError("Movie not found");

    const existingReview = movie.reviews.find(r => r._id.toString() === reviewId);

    if (!existingReview) throw new NotFoundError("Review not found");

    movie.reviews.pull(reviewId);
    movie.numReviews = movie.reviews.length;

    await movie.save();
    return movie;
  }

  async getNewMovies() {
    return await Movie.find().sort({ createdAt: -1 }).limit(10);
  }

  async getTopMovies() {
    return await Movie.find().sort({ numReviews: -1 }).limit(10);
  }

  async getRandomMovies() {
    return await Movie.aggregate([{$sample: {size: 10}}]);
  }
} 