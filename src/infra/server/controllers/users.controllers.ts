import { Request, Response } from "express";

import { ICreateUserDTO, IUpdateUserDTO } from "../../../core/dtos/user.dtos";

import { UsersRepository } from "../../database/repositories/users.repository";
import { UsersServices } from "../../../core/services/users.services";

const usersRepository = new UsersRepository();
const usersServices = new UsersServices(usersRepository);

interface IUpdateRequestBody extends IUpdateUserDTO {
  password?: string;
}

class UsersControllers {
  async create(req: Request, res: Response): Promise<Response> {
    const userDTO = req.body as ICreateUserDTO;

    await usersServices.create(userDTO);

    return res.status(201).send();
  }

  async update(req: Request, res: Response): Promise<Response> {
    //lidando com um possível erro na requisição
    const { password, ...userDTO } = req.body as IUpdateRequestBody;

    await usersServices.update(userDTO);

    return res.status(204).send();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    await usersServices.delete(id);

    return res.status(204).send();
  }
}

export { UsersControllers };
