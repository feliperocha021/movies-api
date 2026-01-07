import { MovieDTO } from "../dtos/response/movie.dto.js";
import { IMovieDocument } from "../models/movie.model.js";
import { toReviewDTO } from "./review.mapper.js";

export function toMovieDTO(movie: IMovieDocument): MovieDTO {
  return {
    id: movie._id.toString(),
    name: movie.name,
    image: movie.image,
    year: movie.year,
    details: movie.details,
    cast: movie.cast,
    reviews: movie.reviews.map(toReviewDTO),
    numReviews: movie.numReviews,
    genre: movie.genre.toString(),
  }
}