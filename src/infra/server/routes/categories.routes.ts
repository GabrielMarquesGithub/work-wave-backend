import { Router } from "express";
import multer from "multer";

import { CategoriesControllers } from "../controllers/categories.controllers";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

import { multerConfig } from "../../configs/upload";

const categoriesRoutes = Router();
const categoriesControllers = new CategoriesControllers();

const imageUpload = multer(multerConfig);

categoriesRoutes.put(
  "/icon/:id",
  imageUpload.single("image"),
  categoriesControllers.createIcon
);

categoriesRoutes.get("/", categoriesControllers.findAll);

categoriesRoutes.get("/:id", categoriesControllers.findByIdWithServices);

categoriesRoutes.use(ensureAuthentication);

categoriesRoutes.post("/", categoriesControllers.create);

categoriesRoutes.delete("/icon/:id", categoriesControllers.deleteIcon);

categoriesRoutes.delete("/:id", categoriesControllers.delete);

export { categoriesRoutes };
