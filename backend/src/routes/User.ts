import express from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { updateUserValidate } from '../validations/updateUserValidation';
import { userValidate } from '../validations/userValidations';

const router = express.Router();

router.post('/', userValidate, new UserController().createUser);

router.get('/', authMiddleware, new UserController().getUser);

router.put(
  '/:idUser',
  authMiddleware,
  updateUserValidate,
  new UserController().updateUser
);

router.post('/login', new UserController().authenticateUser);

export default router;
