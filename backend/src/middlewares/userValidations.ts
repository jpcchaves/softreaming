import { body } from "express-validator";

export const userValidate = [
  body("userName")
    .isString()
    .escape()
    .not()
    .isEmpty()
    .withMessage("O nome de usuário é obrigatório!"),
  body("email")
    .escape()
    .not()
    .isEmpty()
    .withMessage("A categoria do filme é obrigatória!")
    .isEmail()
    .withMessage("Digite um email válido!"),
  body("password")
    .escape()
    .not()
    .isEmpty()
    .withMessage("A senha é obrigatória!"),
];
