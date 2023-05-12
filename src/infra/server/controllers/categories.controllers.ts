import { Request, Response } from "express";

import { ICreateCategoryDTO } from "../../../core/dtos/category.dtos";

import { CategoriesRepository } from "../../database/repositories/categories.repository";
import { CategoriesServices } from "../../services/categories.services";
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

  async findByIdWithServices(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const category = await categoriesServices.findById(id);

    return res.json(category);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const categoryDTO = req.body as ICreateCategoryDTO;

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
