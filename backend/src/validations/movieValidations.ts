import { body } from 'express-validator';

export const movieValidate = [
  body('movieName')
    .not()
    .isEmpty()
    .withMessage('O nome do filme é obrigatório!'),
  body('category')
    .not()
    .isEmpty()
    .withMessage('A categoria do filme é obrigatória!'),
  body('description')
    .not()
    .isEmpty()
    .withMessage('A descrição do filme é obrigatória!'),
  body('duration')
    .not()
    .isEmpty()
    .withMessage('A duração do filme é obrigatória!'),
  body('releaseDate')
    .not()
    .isEmpty()
    .withMessage('A data de lançamento do filme é obrigatória!'),
  body('movie_url')
    .not()
    .isEmpty()
    .withMessage('A URL do filme é obrigatória!')
    .isURL()
    .withMessage('Insira uma URL válida!'),
  body('poster_url')
    .not()
    .isEmpty()
    .withMessage('O poster do filme é obrigatório!')
    .isURL()
    .withMessage('Insira uma URL válida!'),
];
