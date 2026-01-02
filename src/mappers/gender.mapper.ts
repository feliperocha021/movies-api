import { GenreDTO } from "../dtos/response/gender.dto";
import { IGenreDocument } from "../models/genre.model";

export function toGenreDTO(genre: IGenreDocument): GenreDTO {
  return {
    id: genre._id.toString(),
    name: genre.name,
  };
}
