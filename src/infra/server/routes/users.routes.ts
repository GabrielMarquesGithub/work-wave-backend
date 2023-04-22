import { Router } from "express";
import multer from "multer";

import { UsersControllers } from "../controllers/users.controllers";

import { multerImageUploadConfig } from "../../configs/multerImageUpload.config";

const usersRoutes = Router();
const usersControllers = new UsersControllers();

// Criação do middleware de imagem
const imageUpload = multer(multerImageUploadConfig({ folder: "/tmp" }));

usersRoutes.get("/", usersControllers.findAll);

// Vai ser criado posteriormente rotas especificas para imagem
usersRoutes.post("/", usersControllers.create);

usersRoutes.delete("/", usersControllers.delete);

export { usersRoutes };
