import { Router } from "express";
import multer from "multer";

import { multerImageUploadConfig } from "../../configs/multerImageUpload.config";

import { ImagesController } from "../controllers/images.controllers";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const imagesControllers = new ImagesController();
const imagesRoutes = Router();

// Criação do middleware de imagem
const imageUpload = multer(multerImageUploadConfig({ folder: "/tmp" }));

imagesRoutes.post("/", imageUpload.single("image"), imagesControllers.create);

imagesRoutes.delete("/", ensureAuthentication, imagesControllers.delete);

export { imagesRoutes };
