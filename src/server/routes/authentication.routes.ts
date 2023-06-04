import { Router } from "express";
import { AuthenticationControllers } from "../controllers/authentication.controllers";

const authenticationRoutes = Router();
const usersControllers = new AuthenticationControllers();

authenticationRoutes.post("/sessions", usersControllers.createSession);
authenticationRoutes.post(
  "/sessions_with_code",
  usersControllers.createSessionWithCode
);
authenticationRoutes.post("/refresh_token", usersControllers.refreshToken);
authenticationRoutes.post(
  "/recover_password",
  usersControllers.recoverPassword
);

export { authenticationRoutes };
