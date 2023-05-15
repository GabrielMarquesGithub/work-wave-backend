import { Request, Response } from "express";

import { ICreateCategoryRequestDTO } from "../../../core/dtos/category.dtos";

import { CategoriesRepository } from "../../database/repositories/categories.repository";
import { CategoriesServices } from "../../services/categories.services";
import { LocalStorageProvider } from "../../providers/localStorage.provider";
import { ServicesServices } from "../../services/services.services";
import { ServicesRepository } from "../../database/repositories/services.repository";
import { ServicesImagesRepository } from "../../database/repositories/servicesImages.repository";
import { ServiceOrderOptions } from "../../configs/orderConstants";

const storageProvider = new LocalStorageProvider();

const servicesRepository = new ServicesRepository();
const servicesImagesRepository = new ServicesImagesRepository();

const servicesServices = new ServicesServices(
  servicesRepository,
  servicesImagesRepository,
  storageProvider
);

const categoriesRepository = new CategoriesRepository();
const categoriesServices = new CategoriesServices(
  categoriesRepository,
  storageProvider
);

class CategoriesControllers {
  async findAll(req: Request, res: Response): Promise<Response> {
    const all = await categoriesServices.findAll();

    return res.json(all);
  }

  async findOneByIdWithServicesAndServicesImages(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;
    const { page, limit, order, cep } = req.query;

    const category = await categoriesServices.findOneById(id);
    const services = await servicesServices.findByCategoryIdWithServicesImages(
      id,
      // Por padrão  o typeorm interpreta os query corretamente como number
      page as unknown as number,
      limit as unknown as number,
      order as unknown as ServiceOrderOptions,
      cep as unknown as string
    );

    category.services = services;

    return res.json(category);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const categoryDTO = req.body as ICreateCategoryRequestDTO;

    await categoriesServices.create(categoryDTO);

    return res.status(201).send();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await categoriesServices.delete(id);

    return res.status(204).send();
  }

  async createIcon(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { filename } = req.file as Express.Multer.File;

    await categoriesServices.createIcon(id, filename);

    return res.status(204).send();
  }

  async deleteIcon(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await categoriesServices.deleteIcon(id);

    return res.status(204).send();
  }
}

export { CategoriesControllers };
