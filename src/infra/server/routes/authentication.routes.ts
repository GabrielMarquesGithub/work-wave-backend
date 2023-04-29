import { Router } from "express";
import { AuthenticationControllers } from "../controllers/authentication.controllers";

const authenticationRoutes = Router();
const usersControllers = new AuthenticationControllers();

authenticationRoutes.post("/sessions", usersControllers.createSession);
authenticationRoutes.post("/refresh_token", usersControllers.refreshToken);

export { authenticationRoutes };
