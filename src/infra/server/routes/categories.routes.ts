import { Router } from "express";

import { CategoriesControllers } from "../controllers/categories.controllers";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const categoriesRoutes = Router();
const categoriesControllers = new CategoriesControllers();

categoriesRoutes.use(ensureAuthentication);

categoriesRoutes.get("/", categoriesControllers.findAll);

categoriesRoutes.post("/", categoriesControllers.create);

categoriesRoutes.delete("/", categoriesControllers.delete);

export { categoriesRoutes };
