import { body } from "express-validator";

export const profileValidation = [
  body("profileName")
    .isString()
    .escape()
    .not()
    .isEmpty()
    .withMessage("O nome de usuário é obrigatório!")
    .isLength({ min: 3 })
    .withMessage("O nome do perfil precisa ter no mínimo 3 caracteres"),
  body("profileUrlImage").isURL().withMessage("Insira uma URL válida!"),
];
