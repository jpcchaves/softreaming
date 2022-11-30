import { Request, Response } from 'express';
import { movieRepository } from '../repositories/movieRepository';
import { validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../helpers/apiErrors';

export class MovieController {
  async createMovie(req: Request, res: Response) {
    const {
      movieName,
      category,
      description,
      duration,
      releaseDate,
      movie_url,
      poster_url,
    } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      const { msg }: {msg: string} = errors.array()[0];

      throw new BadRequestError(msg);

    }

    const newMovie = movieRepository.create({
      movieName,
      category,
      description,
      duration,
      releaseDate,
      movie_url,
      poster_url,
    });

    await movieRepository.save(newMovie);

    return res.status(201).json(newMovie);
  }

  async getAllMovies(req: Request, res: Response) {

    const allMovies = await movieRepository.find();

    if(!allMovies){
      throw new BadRequestError('Não foi possível localizar os filmes.');
    }

    return res.status(200).json(allMovies);
  }

  async getOneMovie(req: Request, res: Response) {
    const { movieId } = req.params;

    if (!(await movieRepository.findOneBy({ id: Number(movieId) }))) {

      throw new BadRequestError('Filme não encontrado.');

    }

    const movie = await movieRepository.findOneBy({ id: Number(movieId) });

    return res.status(200).json(movie);
  }

  async deleteMovie(req: Request, res: Response) {
    const { movieId } = req.params;

    if (!(await movieRepository.findOneBy({ id: Number(movieId) }))) {
      throw new NotFoundError('Filme não encontrado.');
    }

    await movieRepository.delete(movieId);
    res.status(204).end();
  }

  async updateMovie(req: Request, res: Response) {
    const { movieId } = req.params;

    const {
      movieName,
      category,
      description,
      duration,
      releaseDate,
      movie_url,
      poster_url,
    } = req.body;

    if (!(await movieRepository.findOneBy({ id: Number(movieId) }))) {
      throw new NotFoundError('Filme não encontrado.');
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { msg }: {msg: string} = errors.array()[0];
      throw new BadRequestError(msg);
    }

    const updatedMovie = {
      movieName,
      category,
      description,
      duration,
      releaseDate,
      movie_url,
      poster_url,
    };

    await movieRepository.update(movieId, updatedMovie);

    return res.status(201).json(updatedMovie);
  }
}
