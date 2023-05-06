import { Router } from "express";
import multer from "multer";

import { ServicesControllers } from "../controllers/services.controllers";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

import { multerConfig } from "../../configs/upload";

const servicesRoutes = Router();
const servicesControllers = new ServicesControllers();

const imageUpload = multer(multerConfig);

servicesRoutes.use(ensureAuthentication);

servicesRoutes.post("/", servicesControllers.create);

servicesRoutes.put("/", servicesControllers.update);

servicesRoutes.delete("/", servicesControllers.delete);

servicesRoutes.put(
  "/images/:id",
  imageUpload.array("images"),
  servicesControllers.createImages
);

servicesRoutes.delete("/images", servicesControllers.deleteImage);

export { servicesRoutes };
