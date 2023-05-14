import { Router } from "express";
import multer from "multer";

import { UsersControllers } from "../controllers/users.controllers";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

import { multerConfig } from "../../configs/upload";

const usersRoutes = Router();
const usersControllers = new UsersControllers();

const imageUpload = multer(multerConfig);

usersRoutes.post("/", usersControllers.create);

usersRoutes.use(ensureAuthentication);

usersRoutes.put(
  "/avatar",
  imageUpload.single("image"),

  usersControllers.createAvatar
);

usersRoutes.delete("/avatar", usersControllers.deleteAvatar);

usersRoutes.put("/", usersControllers.update);

usersRoutes.delete("/:id", usersControllers.delete);

export { usersRoutes };
