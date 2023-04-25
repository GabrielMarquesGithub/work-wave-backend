import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { usersRoutes } from "./users.routes";
import { authenticationRoutes } from "./authentication.routes";

const router = Router();
router.use("/categories", categoriesRoutes);
router.use("/users", usersRoutes);
router.use(authenticationRoutes);

export { router };
