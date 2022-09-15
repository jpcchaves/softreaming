import { Request, Response } from "express";
import { movieRepository } from "../repositories/movieRepository";
import { validationResult } from "express-validator";

export class MovieController {
  async createMovie(req: Request, res: Response) {
    const { movieName, category, description, duration, releaseDate, url } =
      req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
      }

      const newMovie = movieRepository.create({
        movieName,
        category,
        description,
        duration,
        releaseDate,
        url,
      });
      await movieRepository.save(newMovie);

      return res.status(201).json(newMovie);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAllMovies(req: Request, res: Response) {
    try {
      const allMovies = await movieRepository.find();
      return res.status(200).json(allMovies);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteMovie(req: Request, res: Response) {
    const { movieId } = req.params;

    if (!(await movieRepository.findOneBy({ id: Number(movieId) }))) {
      return res.status(400).json({ message: "Filme não encontrado" });
    }

    try {
      await movieRepository.delete(movieId);
      res.status(204).end();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateMovie(req: Request, res: Response) {
    const { movieId } = req.params;
    const { movieName, category, description, duration, releaseDate, url } =
      req.body;

    if (!(await movieRepository.findOneBy({ id: Number(movieId) }))) {
      return res.status(400).json({ message: "Filme não encontrado" });
    }

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updatedMovie = {
        movieName,
        category,
        description,
        duration,
        releaseDate,
        url,
      };

      await movieRepository.update(movieId, updatedMovie);

      return res.status(201).json(updatedMovie);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
