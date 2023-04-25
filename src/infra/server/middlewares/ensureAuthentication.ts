import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../../../core/errors/app.error";

import { UsersRepository } from "../../database/repositories/users.repository";

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
  try {
    const { sub } = verify(token, "");

    // Checando tipo e tentando buscar user na base de dados
    const user =
      typeof sub === "string" ? usersRepository.findOneById(sub) : undefined;

    if (!user) {
      throw new AppError("User does not exist", 400);
    }

    next();
  } catch {
    throw new AppError("Invalid authorization token", 400);
  }
}

export { ensureAuthentication };
