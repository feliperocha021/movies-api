import { Router } from "express";
import { UploadController } from "../controllers/upload.controller.js";
import { UploadService } from "../services/upload.service.js";
import { requireAuth } from "../middlewares/auth.middlewares.js";

export const uploadRouter = (uploadController: UploadController, uploadService: UploadService) => {
  const router = Router();

  router.route("/")
    .post(requireAuth, 
          uploadService.uploadSingleImage(),
          uploadController.handleUpload.bind(uploadController)
        )

  return router;
}
