import { Request, Response } from "express";

import { UsersRepository } from "../../database/repositories/users.repository";
import { UsersTokensRepository } from "../../database/repositories/usersTokens.repository";
import { AuthenticationServices } from "../../services/authentication.services";
import { IAuthenticationUserDTO } from "../../dtos/user.dtos";
import { DateProvide } from "../../providers/date.provider";
import { EmailProvider } from "../../providers/email.provider";
import { emailConfig } from "../../configs/email.config";

const usersRepository = new UsersRepository();
const usersTokensRepository = new UsersTokensRepository();
const dateProvider = new DateProvide();
const emailProvider = new EmailProvider(
  emailConfig.email ?? "",
  emailConfig.password ?? ""
);
const authenticationServices = new AuthenticationServices(
  usersRepository,
  usersTokensRepository,
  dateProvider,
  emailProvider
);

class AuthenticationControllers {
  async createSession(req: Request, res: Response): Promise<Response> {
    const authenticationUserDTO = req.body as IAuthenticationUserDTO;

    const token = await authenticationServices.authenticateUser(
      authenticationUserDTO
    );

    return res.json(token);
  }

  async createSessionWithCode(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as IAuthenticationUserDTO;

    const token = await authenticationServices.validatePasswordChangeCode(
      email,
      password
    );

    return res.json(token);
  }

  async recoverPassword(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    await authenticationServices.validatePasswordChange(email);

    return res.status(204).send();
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;

    const token = await authenticationServices.refreshToken(refreshToken);

    return res.json(token);
  }
}

export { AuthenticationControllers };
