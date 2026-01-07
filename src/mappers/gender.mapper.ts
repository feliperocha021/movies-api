import { GenreDTO } from "../dtos/response/gender.dto.js";
import { IGenreDocument } from "../models/genre.model.js";

export function toGenreDTO(genre: IGenreDocument): GenreDTO {
  return {
    id: genre._id.toString(),
    name: genre.name,
  };
}
