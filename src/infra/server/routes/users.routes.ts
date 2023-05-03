import { Router } from "express";

import { UsersControllers } from "../controllers/users.controllers";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const usersRoutes = Router();
const usersControllers = new UsersControllers();

// Vai ser criado posteriormente rotas especificas para imagem
usersRoutes.post("/", usersControllers.create);

usersRoutes.put("/", ensureAuthentication, usersControllers.update);

usersRoutes.delete("/", ensureAuthentication, usersControllers.delete);

export { usersRoutes };
