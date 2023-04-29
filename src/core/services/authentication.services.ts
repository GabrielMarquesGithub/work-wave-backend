import { sign, verify } from "jsonwebtoken";
import { compare } from "bcryptjs";

import { AppError } from "../errors/app.error";

import { IUsersRepository } from "../interfaces/usersRepository.interface";
import { IUsersTokensRepository } from "../interfaces/usersTokensRepository.interface";
import { IUserDTO } from "../dtos/user.dto";
import { IAuthenticationUserDTO } from "../dtos/authenticationUser.dto";
import { IDateProvider } from "../interfaces/dateProvider.interface";

import { validateEmailFormat } from "../utils/validation/validateEmailFormat";
import { validatePasswordFormat } from "../utils/validation/validatePasswordFormat";

import { authConfig } from "../../infra/configs/auth.config";

interface IResponse {
  user: Pick<IUserDTO, "email" | "name" | "cep">;
  token: string;
  refreshToken: string;
}

class AuthenticationServices {
  private usersRepository: IUsersRepository;
  private usersTokensRepository: IUsersTokensRepository;
  private dateProvider: IDateProvider;

  constructor(
    usersRepository: IUsersRepository,
    usersTokensRepository: IUsersTokensRepository,
    dateProvider: IDateProvider
  ) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async createTokens(subject: string) {
    // Cria o token JWT
    const token = sign({}, authConfig.secret_token, {
      subject: subject,
      expiresIn: authConfig.expires_in_token,
    });

    const refreshToken = sign({}, authConfig.secret_refresh_token, {
      subject: subject,
      expiresIn: authConfig.expires_in_refresh_token,
    });

    // Transformando o formato de tempo de expiração padrão do JWT em número
    const expiresInRefreshTokenNumber = Number(
      authConfig.expires_in_refresh_token.replace(/\D/g, "")
    );

    // Adicionando o numero de dias na data atual e transformando em uma data
    const expiresDate = this.dateProvider.addDays(expiresInRefreshTokenNumber);

    // Criando entidade users_tokens
    await this.usersTokensRepository.create({
      refresh_token: refreshToken,
      expires_date: expiresDate,
      user_id: subject,
    });

    return {
      token,
      refreshToken,
    };
  }

  async authenticateUser(
    authenticationUserDTO: IAuthenticationUserDTO
  ): Promise<IResponse> {
    validateEmailFormat(authenticationUserDTO.email);
    validatePasswordFormat(authenticationUserDTO.password);

    // Verifica a existência do user pelo seu Email
    const userWithEmail = await this.usersRepository.findOneByEmail(
      authenticationUserDTO.email
    );
    if (!userWithEmail) {
      throw new AppError("Email or Password incorrect!", 400);
    }

    // Verifica se as senha batem ou não
    const passwordsMatch = await compare(
      authenticationUserDTO.password,
      userWithEmail.password
    );
    if (!passwordsMatch) {
      throw new AppError("Email or Password incorrect!", 400);
    }

    // Desestruturando infos a serem retornadas junto do token
    const { email, name, cep } = userWithEmail;
    const tokens = await this.createTokens(userWithEmail.id);

    return {
      user: {
        email,
        name,
        cep,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    // Tentar verificar a autenticidade do token usando a chave
    let sub: string | (() => string) | undefined;
    try {
      sub = verify(refreshToken, authConfig.secret_refresh_token).sub;
    } catch {
      throw new AppError("Invalid refresh token", 400);
    }

    // Checando tipo
    if (typeof sub !== "string") {
      throw new AppError("Invalid subject", 400);
    }

    const userToken =
      await this.usersTokensRepository.findOneByUserIdAndRefreshToken(
        sub,
        refreshToken
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exist", 400);
    }

    await this.usersTokensRepository.delete(userToken.id);

    const { email, name, cep } = userToken.user;
    const tokens = await this.createTokens(userToken.user.id);

    return {
      user: {
        email,
        name,
        cep,
      },
      ...tokens,
    };
  }
}

export { AuthenticationServices };
