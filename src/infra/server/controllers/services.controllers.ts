import { Request, Response } from "express";

import {
  ICreateServiceRequestDTO,
  IUpdateServiceRequestDTO,
} from "../../../core/dtos/service.dtos";

import { ServicesRepository } from "../../database/repositories/services.repository";
import { ServicesServices } from "../../services/services.services";
import { ServicesImagesRepository } from "../../database/repositories/servicesImages.repository";
import { LocalStorageProvider } from "../../providers/localStorage.provider";
import { ServiceOrderOptions } from "../../configs/orderConstants";

const servicesRepository = new ServicesRepository();
const servicesImagesRepository = new ServicesImagesRepository();
const storageProvider = new LocalStorageProvider();

const servicesServices = new ServicesServices(
  servicesRepository,
  servicesImagesRepository,
  storageProvider
);

class ServicesControllers {
  async findOneByIdWithServicesImagesAndUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;

    const service = await servicesServices.findOneByIdWithServicesImagesAndUser(
      id
    );

    return res.json(service);
  }

  async findByUserIdWithServicesImages(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;

    const services = await servicesServices.findByUserIdWithServicesImages(id);

    return res.json(services);
  }

  async findBySearchTextWithServicesImages(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { searchText } = req.params;
    const { page, limit, order, cep } = req.query;

    const services = await servicesServices.findBySearchTextWithServicesImages(
      searchText,
      // Por padrão  o typeorm interpreta os query corretamente como number
      page as unknown as number,
      limit as unknown as number,
      order as unknown as ServiceOrderOptions,
      cep as unknown as string
    );
    return res.json(services);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const serviceDTO = req.body as ICreateServiceRequestDTO;

    await servicesServices.create(serviceDTO);

    return res.status(201).send();
  }

  async update(req: Request, res: Response): Promise<Response> {
    const serviceDTO = req.body as IUpdateServiceRequestDTO;

    await servicesServices.update(serviceDTO);

    return res.status(204).send();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

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
    const { id } = req.params;

    await servicesServices.deleteImage(id);

    return res.status(204).send();
  }
}

export { ServicesControllers };
