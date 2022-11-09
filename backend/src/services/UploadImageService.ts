import S3Storage from "../utils/S3Storage";

class UploadImagesService {
  public s3UrlFile: string;

  async execute(file: Express.Multer.File): Promise<void> {
    const s3Storage = new S3Storage();

    await s3Storage.saveFile(file.filename);

    this.s3UrlFile = s3Storage.imageS3Url;
  }
}

export default UploadImagesService;
