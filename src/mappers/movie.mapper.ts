import { MovieDTO } from "../dtos/response/movie.dto";
import { IMovieDocument } from "../models/movie.model";

export function toMovieDTO(movie: IMovieDocument): MovieDTO {
  return {
    id: movie._id.toString(),
    name: movie.name,
    image: movie.image,
    year: movie.year,
    details: movie.details,
    cast: movie.cast,
    reviews: movie.reviews,
    numReviews: movie.numReviews,
    genre: movie.genre,
  }
}