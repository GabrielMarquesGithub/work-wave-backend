import { Router } from "express";
import multer from "multer";

import { UsersControllers } from "../controllers/users.controllers";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

import { multerConfig } from "../../configs/upload";

const usersRoutes = Router();
const usersControllers = new UsersControllers();

const imageUpload = multer(multerConfig);

// Vai ser criado posteriormente rotas especificas para imagem
usersRoutes.post("/", usersControllers.create);

usersRoutes.put("/", ensureAuthentication, usersControllers.update);

usersRoutes.delete("/", ensureAuthentication, usersControllers.delete);

usersRoutes.put(
  "/avatar",
  imageUpload.single("image"),
  ensureAuthentication,
  usersControllers.createAvatar
);

export { usersRoutes };
