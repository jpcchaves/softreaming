import express from 'express';
import { MovieController } from '../controllers/MovieController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { movieValidate } from '../validations/movieValidations';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  movieValidate,
  new MovieController().createMovie
);

router.get('/', authMiddleware, new MovieController().getAllMovies);

router.get(
  '/:movieId',
  authMiddleware,
  new MovieController().getOneMovie
);

router.delete(
  '/:movieId',
  authMiddleware,
  new MovieController().deleteMovie
);

router.put(
  '/:movieId',
  authMiddleware,
  movieValidate,
  new MovieController().updateMovie
);

export default router;
