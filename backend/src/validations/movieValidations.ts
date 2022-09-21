import { body } from "express-validator";

export const movieValidate = [
  body("movieName")
    .escape()
    .not()
    .isEmpty()
    .withMessage("O nome do filme é obrigatório!"),
  body("category")
    .escape()
    .not()
    .isEmpty()
    .withMessage("A categoria do filme é obrigatória!"),
  body("description")
    .escape()
    .not()
    .isEmpty()
    .withMessage("A descrição do filme é obrigatória!"),
  body("duration")
    .escape()
    .not()
    .isEmpty()
    .withMessage("A duração do filme é obrigatória!"),
  body("releaseDate")
    .escape()
    .not()
    .isEmpty()
    .withMessage("A data de lançamento do filme é obrigatória!"),
  body("url")
    .escape()
    .isURL()
    .withMessage("Insira uma URL válida!"),
];
