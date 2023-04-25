import { IUsersRepository } from "../interfaces/usersRepository.interface";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import { AppError } from "../errors/app.error";

import { IUserDTO } from "../dtos/user.dto";
import { IAuthenticationUserDTO } from "../dtos/authenticationUser";

import { validateEmailFormat } from "../utils/validation/validateEmailFormat";
import { validatePasswordFormat } from "../utils/validation/validatePasswordFormat";

interface IResponse {
  user: Pick<IUserDTO, "email" | "name" | "cep">;
  token: string;
}

class AuthenticationServices {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async authenticateUser(
    authenticationUserDTO: IAuthenticationUserDTO
  ): Promise<IResponse> {
    validateEmailFormat(authenticationUserDTO.email);
    validatePasswordFormat(authenticationUserDTO.password);

    compare;

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

    // Cria o token JWT
    const token = sign({}, "", {
      subject: userWithEmail.id,
      expiresIn: "1d",
    });

    // Desestruturando infos a serem retornadas junto do token
    const { email, name, cep } = userWithEmail;

    return {
      user: {
        email,
        name,
        cep,
      },
      token,
    };
  }
}

export { AuthenticationServices };
