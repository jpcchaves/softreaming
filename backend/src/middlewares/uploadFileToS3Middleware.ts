import { NextFunction, Request, Response } from 'express';
import UploadImagesService from '../services/UploadImageService';

export const uploadFileToS3Middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { file } = req;

    const uploadImagesService = new UploadImagesService();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await uploadImagesService.execute(file!);

    const urlProfileS3 = uploadImagesService.s3UrlFile;

    req.app.locals.urlProfileS3 = urlProfileS3;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      errors: 'Ocorreu um erro ao enviar a foto. Tente novamente mais tarde.',
    });
  }
};
