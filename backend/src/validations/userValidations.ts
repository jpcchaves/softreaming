import { body } from 'express-validator';

export const userValidate = [
  body('userName')
    .isString()
    .not()
    .isEmpty()
    .withMessage('O nome de usuário é obrigatório!')
    .isLength({ min: 5 })
    .withMessage('O nome precisa ter no mínimo 5 caracteres.'),
  body('email')
    .not()
    .isEmpty()
    .withMessage('O email é obrigatório!')
    .isEmail()
    .withMessage('Digite um email válido!'),
  body('password')
    .isString()
    .not()
    .isEmpty()
    .withMessage('A senha é obrigatória!')
    .isLength({ min: 5 })
    .withMessage('A senha precisa ter no mínimo 5 caracteres.'),
  body('confirmPassword')
    .isString()
    .not()
    .isEmpty()
    .withMessage('A confirmação de senha é obrigatória!')
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error('As senhas não são iguais.');
      }
      return true;
    }),
];
