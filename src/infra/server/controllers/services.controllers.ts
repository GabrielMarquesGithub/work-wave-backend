import { Request, Response } from "express";

import {
  ICreateServiceDTO,
  IUpdateServiceDTO,
} from "../../../core/dtos/service.dtos";

import { ServicesRepository } from "../../database/repositories/services.repository";
import { ServicesServices } from "../../../core/services/services.services";

const servicesRepository = new ServicesRepository();
const servicesServices = new ServicesServices(servicesRepository);

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
}

export { ServicesControllers };
