import { Router } from "express";

import { imagesRoutes } from "./images.routes";
import { categoriesRoutes } from "./categories.routes";
import { usersRoutes } from "./users.routes";
import { authenticationRoutes } from "./authentication.routes";

const router = Router();
router.use("/images", imagesRoutes);
router.use("/categories", categoriesRoutes);
router.use("/users", usersRoutes);
router.use(authenticationRoutes);

export { router };
