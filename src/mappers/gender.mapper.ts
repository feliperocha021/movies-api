import { genreDTO } from "../dtos/gender.dto";
import { IGenreDocument } from "../models/genre.model";

export function toGenreDTO(genre: IGenreDocument): genreDTO {
  return {
    id: genre._id.toString(),
    name: genre.name,
  };
}
