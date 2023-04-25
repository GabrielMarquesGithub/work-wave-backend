import { Request, Response } from "express";

import { UsersRepository } from "../../database/repositories/users.repository";
import { AuthenticationServices } from "../../../core/services/authentication.services";
import { IAuthenticationUserDTO } from "../../../core/dtos/authenticationUser";

const usersRepository = new UsersRepository();
const authenticationServices = new AuthenticationServices(usersRepository);

class AuthenticationControllers {
  async createSession(req: Request, res: Response): Promise<Response> {
    const authenticationUserDTO = req.body as IAuthenticationUserDTO;

    const token = await authenticationServices.authenticateUser(
      authenticationUserDTO
    );

    return res.json(token);
  }
}

export { AuthenticationControllers };
