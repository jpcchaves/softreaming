import multer from "multer";
import path from "path";
import crypto from "crypto";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");

      const filename = `${fileHash}-${file.originalname}`;

      const types = /png|jpg|jpeg/;

      const extName = types.test(
        path.extname(file.originalname).toLocaleLowerCase()
      );

      const mimetype = types.test(file.mimetype);

      if (extName && mimetype) {
        callback(null, filename);
      } else {
        callback(
          new Error(
            "Arquivo inválido! Os arquivos suportados são: JPG, JPEG e PNG."
          ),
          filename
        );
      }
    },
  }),
};
