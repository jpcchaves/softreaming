import aws, { S3 } from "aws-sdk";
import path from "path";
import mime from "mime";
import fs from "fs";

import multerConfig from "../config/multer";

class S3Storage {
  private client: S3;
  public imageS3Url: string;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
      },
    });
  }

  async saveFile(filename: string): Promise<void> {
    const originalPath = path.resolve(multerConfig.directory, filename);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error("Arquivo não encontrado!");
    }

    const fileContent = await fs.promises.readFile(originalPath);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: filename,
      Body: fileContent,
    };

    this.client.putObject(params).promise();

    const uploadURL = await this.client.getSignedUrlPromise(
      "putObject",
      params
    );

    this.imageS3Url = uploadURL.split("?")[0];

    await fs.promises.unlink(originalPath);
  }
}

export default S3Storage;
