import { Request, Response } from "express";

import {
  ICreateUserRequestDTO,
  IUpdateUserRequestDTO,
} from "../../dtos/user.dtos";

import { ServiceOrderOptions } from "../../enums/order.enum";

import { UsersRepository } from "../../database/repositories/users.repository";
import { UsersServices } from "../../services/users.services";
import { LocalStorageProvider } from "../../providers/localStorage.provider";
import { ServicesRepository } from "../../database/repositories/services.repository";
import { ServicesImagesRepository } from "../../database/repositories/servicesImages.repository";
import { ServicesServices } from "../../services/services.services";

const storageProvider = new LocalStorageProvider();

const servicesRepository = new ServicesRepository();
const servicesImagesRepository = new ServicesImagesRepository();

const servicesServices = new ServicesServices(
  servicesRepository,
  servicesImagesRepository,
  storageProvider
);

const usersRepository = new UsersRepository();
const usersServices = new UsersServices(usersRepository, storageProvider);

// Tipo criado para prevenção de falhas
interface IUpdateRequestBody extends IUpdateUserRequestDTO {
  password?: string;
}

class UsersControllers {
  async findOneByIdWithServicesAndServicesImages(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;
    const { page, limit, order } = req.query;

    const user = await usersServices.findOneById(id);
    const services = await servicesServices.findByUserIdWithServicesImages(
      id,
      // Por padrão  o typeorm interpreta os query corretamente como number
      page as unknown as number,
      limit as unknown as number,
      order as unknown as ServiceOrderOptions
    );

    user.services = services;

    return res.json(user);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const userDTO = req.body as ICreateUserRequestDTO;

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
