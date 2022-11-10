import { body } from "express-validator";

export const updateUserValidate = [
  body("userName")
    .isString()
    .not()
    .isEmpty()
    .withMessage("O nome de usuário é obrigatório!")
    .isLength({ min: 5 })
    .withMessage("O nome precisa ter no mínimo 5 caracteres."),
  body("password")
    .isString()
    .not()
    .isEmpty()
    .withMessage("A senha é obrigatória!")
    .isLength({ min: 5 })
    .withMessage("A senha precisa ter no mínimo 5 caracteres."),
];
