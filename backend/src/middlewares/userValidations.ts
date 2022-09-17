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
    .isString()
    .withMessage("A categoria do filme é obrigatória!")
    .isEmail()
    .withMessage("Digite um email válido!"),
  body("password")
    .isString()
    .escape()
    .not()
    .isEmpty()
    .withMessage("A senha é obrigatória!")
    .isLength({ min: 5 })
    .withMessage("A senha precisa ter no mínimo 5 caracteres."),
  body("confirmPassword")
    .isString()
    .escape()
    .not()
    .isEmpty()
    .withMessage("A confirmação de senha é obrigatória!")
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("As senhas não são iguais.");
      }
      return true;
    }),
];
