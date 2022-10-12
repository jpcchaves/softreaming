import { body } from "express-validator";

export const updateUserValidate = [
  body("userName")
    .isString()
    .escape()
    .not()
    .isEmpty()
    .withMessage("O nome de usuário é obrigatório!")
    .isLength({ min: 5 })
    .withMessage("O nome precisa ter no mínimo 3 caracteres."),
  body("password")
    .isString()
    .escape()
    .not()
    .isEmpty()
    .withMessage("A senha é obrigatória!")
    .isLength({ min: 5 })
    .withMessage("A senha precisa ter no mínimo 5 caracteres."),
];
