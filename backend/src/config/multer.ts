import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileFilter: (req: any, file: Express.Multer.File, callback: any) => {
    const allowedFiles = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!allowedFiles.includes(file.mimetype)) {
      return callback(
        new Error(
          'O arquivo enviado não é permitido. Os arquivos permitidos são: JPG, JPEG e PNG.'
        )
      );
    }

    callback(null, true);
  },
};
