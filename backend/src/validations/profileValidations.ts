import { body } from "express-validator";

export const profileValidation = [
  body("profileName")
    .isString()
    .not()
    .isEmpty()
    .withMessage("O nome de usuário é obrigatório!")
    .isLength({ min: 5 })
    .withMessage("O nome do perfil precisa ter no mínimo 5 caracteres"),
  body("profileUrlImage")
    .not()
    .isEmpty()
    .withMessage("A imagem de perfil é obrigatória!"),
];
