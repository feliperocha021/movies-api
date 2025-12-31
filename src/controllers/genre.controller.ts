import { NextFunction, Request, Response } from "express";
import { GenreService } from "../services/genre.service";
import { toGenreDTO } from "../mappers/gender.mapper";
import { success } from "zod";

export class GenreController {
  constructor( private readonly genreService: GenreService) {}

  async createGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const genre = await this.genreService.createGenre(name);
      const formatedGenre = toGenreDTO(genre);
      
      return res.status(201).json({
        success: true,
        message: "Gênero criado com sucesso",
        data: {
          genre: formatedGenre
        }
      });
    } catch (err) {
      next(err);
    }
  }

  async updateGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: genreId } = req.params;
      const { name } = req.body;
      const genre = await this.genreService.updateGenre(genreId, name);

      const formatedGenre = toGenreDTO(genre);
      return res.status(200).json({
        success: true,
        message: "Gênero atualizado com sucesso",
        data: {
          genre: formatedGenre,
        }
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: genreId } = req.params;
      await this.genreService.deleteGenre(genreId);

      return res.status(200).json({
        success: true,
        message: "Gênero deletado com sucesso",
        data: null
      });
    } catch(err) {
      next(err);
    }
  }

  async getAllGenres(req: Request, res: Response, next: NextFunction) {
    try {
      const genres = await this.genreService.getAllGenres();
      const formatedGenres = genres.map((genre) => toGenreDTO(genre));

      return res.status(200).json({
        success: true,
        message: "Gêneros encontrados com succeso",
        data: {
          genres: formatedGenres
        }
      })
    } catch(err) {
      next(err);
    }
  }

  async getGenreById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: genreId } = req.params;
      const genre = await this.genreService.getGenreById(genreId);
      const formatedGenre = toGenreDTO(genre);

      return res.status(200).json({
        success: true,
        message: "Gênero encontrado com sucesso",
        data: {
          genre: formatedGenre
        }
      })
    } catch(err) {
      next(err);
    }
  }
}