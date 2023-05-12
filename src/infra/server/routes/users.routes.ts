import { Router } from "express";
import multer from "multer";

import { UsersControllers } from "../controllers/users.controllers";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

import { multerConfig } from "../../configs/upload";

const usersRoutes = Router();
const usersControllers = new UsersControllers();

const imageUpload = multer(multerConfig);

usersRoutes.put(
  "/avatar",
  imageUpload.single("image"),
  ensureAuthentication,
  usersControllers.createAvatar
);

usersRoutes.delete(
  "/avatar",
  ensureAuthentication,
  usersControllers.deleteAvatar
);

usersRoutes.post("/", usersControllers.create);

usersRoutes.put("/", ensureAuthentication, usersControllers.update);

usersRoutes.delete("/:id", ensureAuthentication, usersControllers.delete);

export { usersRoutes };
