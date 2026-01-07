import { Request, Response, NextFunction } from "express";
import { UploadService } from "../services/upload.service.js";

export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  public handleUpload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return res.status(400).json(
          { 
            success: false,
            message: "No files submitted",
          });
      }

      const fileData = {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };

      return res.status(201).json({
        message: "Upload completed successfully",
        data: {
          file: fileData,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
