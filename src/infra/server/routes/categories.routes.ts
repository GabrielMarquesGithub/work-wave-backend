import { Router } from "express";

import { CategoriesControllers } from "../controllers/categories.controllers";

const categoriesRoutes = Router();
const categoriesControllers = new CategoriesControllers();

categoriesRoutes.get("/", categoriesControllers.findAll);

categoriesRoutes.post("/", categoriesControllers.create);

export { categoriesRoutes };
