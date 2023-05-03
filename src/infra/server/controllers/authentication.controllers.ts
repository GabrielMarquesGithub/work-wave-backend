import { Request, Response } from "express";

import { UsersRepository } from "../../database/repositories/users.repository";
import { UsersTokensRepository } from "../../database/repositories/usersTokens.repository";
import { AuthenticationServices } from "../../../core/services/authentication.services";
import { IAuthenticationUserDTO } from "../../../core/dtos/user.dtos";
import { DateProvide } from "../../providers/date.provider";

const usersRepository = new UsersRepository();
const usersTokensRepository = new UsersTokensRepository();
const dateProvider = new DateProvide();
const authenticationServices = new AuthenticationServices(
  usersRepository,
  usersTokensRepository,
  dateProvider
);

class AuthenticationControllers {
  async createSession(req: Request, res: Response): Promise<Response> {
    const authenticationUserDTO = req.body as IAuthenticationUserDTO;

    const token = await authenticationServices.authenticateUser(
      authenticationUserDTO
    );

    return res.json(token);
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;

    const token = await authenticationServices.refreshToken(refreshToken);

    return res.json(token);
  }
}

export { AuthenticationControllers };
