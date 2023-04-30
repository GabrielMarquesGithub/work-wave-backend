import { Request, Response } from "express";

import { IUserDTO } from "../../../core/dtos/user.dto";

import { UsersRepository } from "../../database/repositories/users.repository";
import { UsersServices } from "../../../core/services/users.services";

const usersRepository = new UsersRepository();
const usersServices = new UsersServices(usersRepository);

class UsersControllers {
  async create(req: Request, res: Response): Promise<Response> {
    const userDTO = req.body as IUserDTO;

    await usersServices.create(userDTO);

    return res.status(201).send();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    await usersServices.delete(id);

    return res.status(204).send();
  }
}

export { UsersControllers };
