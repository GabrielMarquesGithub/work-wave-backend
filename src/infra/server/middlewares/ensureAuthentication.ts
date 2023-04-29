import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../../../core/errors/app.error";

import { UsersRepository } from "../../database/repositories/users.repository";
import { authConfig } from "../../configs/auth.config";

const usersRepository = new UsersRepository();

async function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Missing authorization token", 400);
  }

  // Bearer <token>
  // Vamos usar o me´todo split para acessar o token
  const [, token] = authHeader.split(" ");

  // Tentar verificar a autenticidade do token usando a chave
  let sub: string | (() => string) | undefined;
  try {
    sub = verify(token, authConfig.secret_token).sub;
  } catch {
    throw new AppError("Invalid authorization token", 400);
  }

  // Checando tipo e tentando buscar user na base de dados
  if (typeof sub !== "string") {
    throw new AppError("Invalid subject", 400);
  }

  const user = await usersRepository.findOneById(sub);

  if (!user) {
    throw new AppError("User does not exist", 400);
  }

  next();
}

export { ensureAuthentication };
