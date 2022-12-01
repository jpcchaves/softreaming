import express from 'express';

import { authMiddleware } from '../middlewares/authMiddleware';
import { profileValidation } from '../validations/profileValidations';
import { uploadFileToS3Middleware } from '../middlewares/uploadFileToS3Middleware';
import { UserController } from '../controllers/UserController';

import multerConfig from '../config/multer';
import multer from 'multer';

const upload = multer(multerConfig);

const router = express.Router();

router.post(
  '/:idUser',
  authMiddleware,
  upload.single('profileUrlImage'),
  profileValidation,
  uploadFileToS3Middleware,
  new UserController().createProfile
);

router.get(
  '/:idUser',
  authMiddleware,
  new UserController().getProfiles
);

router.delete(
  '/:idUser/:profileId',
  authMiddleware,
  new UserController().deleteProfile
);

router.put(
  '/:idUser/:profileId',
  authMiddleware,
  upload.single('profileUrlImage'),
  profileValidation,
  uploadFileToS3Middleware,
  new UserController().updateProfile
);

export default router;

