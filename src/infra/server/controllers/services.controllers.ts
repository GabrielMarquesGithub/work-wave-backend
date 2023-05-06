import { Request, Response } from "express";

import {
  ICreateServiceDTO,
  IUpdateServiceDTO,
} from "../../../core/dtos/service.dtos";

import { ServicesRepository } from "../../database/repositories/services.repository";
import { ServicesServices } from "../../services/services.services";
import { ServicesImagesRepository } from "../../database/repositories/servicesImages.repository";
import { LocalStorageProvider } from "../../providers/localStorage.provider";

const servicesRepository = new ServicesRepository();
const servicesImagesRepository = new ServicesImagesRepository();
const storageProvider = new LocalStorageProvider();

const servicesServices = new ServicesServices(
  servicesRepository,
  servicesImagesRepository,
  storageProvider
);

class ServicesControllers {
  async create(req: Request, res: Response): Promise<Response> {
    const serviceDTO = req.body as ICreateServiceDTO;

    await servicesServices.create(serviceDTO);

    return res.status(201).send();
  }

  async update(req: Request, res: Response): Promise<Response> {
    const serviceDTO = req.body as IUpdateServiceDTO;

    await servicesServices.update(serviceDTO);

    return res.status(204).send();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    await servicesServices.delete(id);

    return res.status(204).send();
  }

  async createImages(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as Express.Multer.File[];

    await servicesServices.createImages(id, images);

    return res.status(204).send();
  }

  async deleteImage(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    await servicesServices.deleteImage(id);

    return res.status(204).send();
  }
}

export { ServicesControllers };
