import { Request, Response } from "express";

import { ICreateUserDTO, IUpdateUserDTO } from "../../../core/dtos/user.dtos";

import { UsersRepository } from "../../database/repositories/users.repository";
import { UsersServices } from "../../services/users.services";
import { LocalStorageProvider } from "../../providers/localStorage.provider";

const usersRepository = new UsersRepository();
const storageProvider = new LocalStorageProvider();
const usersServices = new UsersServices(usersRepository, storageProvider);

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
    const { id } = req.params;

    await usersServices.delete(id);

    return res.status(204).send();
  }

  async createAvatar(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { filename } = req.file as Express.Multer.File;

    await usersServices.createAvatar(id, filename);

    return res.status(204).send();
  }

  async deleteAvatar(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    await usersServices.deleteAvatar(id);

    return res.status(204).send();
  }
}

export { UsersControllers };
