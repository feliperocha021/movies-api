import { ConflictError, NotFoundError } from "../errors/error";
import { Genre } from "../models/genre.model";

export class GenreService {
  async createGenre(name: string) {
    const exist = await Genre.findOne({ name });
    
    if (exist) throw new ConflictError("Este gênero já existe");

    const genre = await Genre.create({ name });
    return genre;
  }

  async updateGenre(genreId: string, name: string) {
    const genre = await Genre.findById(genreId);
    if (!genre) throw new NotFoundError("Gênero não encontrado");

    const existName = await Genre.findOne({ name });
    if (existName && existName.name === genre.name) throw new ConflictError("Este nome de gênero já existe");

    genre.name = name;
    await genre.save();

    return genre;
  }

  async deleteGenre(genreId: string) {
    const result = await Genre.deleteOne({ _id: genreId });
    if (result.deletedCount === 0) throw new NotFoundError("Gênero não encontrado");

    return true;
  }

  async getAllGenres() {
    return await Genre.find().sort({ createdAt: -1 });
  }

  async getGenreById(genreId: string) {
    const genre = await Genre.findById(genreId);
    if (!genre) throw new NotFoundError("Gênero não encontrado");
    return genre;
  }
}