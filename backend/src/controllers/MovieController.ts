import { Request, Response } from "express";
import { movieRepository } from "../repositories/movieRepository";

export class MovieController {
  async create(req: Request, res: Response) {
    const { movieName, category, description, duration, releaseDate, url } =
      req.body;

    try {
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
}
