import { Router } from "express";

import { UsersControllers } from "../controllers/users.controllers";

const usersRoutes = Router();
const usersControllers = new UsersControllers();

// Vai ser criado posteriormente rotas especificas para imagem
usersRoutes.post("/", usersControllers.create);

usersRoutes.delete("/", usersControllers.delete);

export { usersRoutes };
