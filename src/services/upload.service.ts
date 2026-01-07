import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

export class UploadService {
  private storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    },
  });

  private fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
      (cb as (error: any, acceptFile: boolean) => void)(null, true);
    } else {
      (cb as (error: any, acceptFile: boolean) => void)(new Error("Only images are allowed"), false);
    }
  };

  public uploadSingleImage() {
    return multer({ storage: this.storage, fileFilter: this.fileFilter }).single("image");
  }
}
