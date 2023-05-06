import { Request, Response } from "express";

import { ICreateCategoryDTO } from "../../../core/dtos/category.dtos";

import { CategoriesRepository } from "../../database/repositories/categories.repository";
import { CategoriesServices } from "../../services/categories.services";
import { LocalStorageProvider } from "../../providers/localStorage.provider";

const categoriesRepository = new CategoriesRepository();
const storageProvider = new LocalStorageProvider();
const categoriesServices = new CategoriesServices(
  categoriesRepository,
  storageProvider
);

class CategoriesControllers {
  async findAll(req: Request, res: Response): Promise<Response> {
    const all = await categoriesServices.findAll();

    return res.json(all);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const categoryDTO = req.body as ICreateCategoryDTO;

    await categoriesServices.create(categoryDTO);

    return res.status(201).send();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    await categoriesServices.delete(id);

    return res.status(204).send();
  }

  async createIcon(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { filename } = req.file as Express.Multer.File;

    await categoriesServices.createIcon(id, filename);

    return res.status(204).send();
  }
}

export { CategoriesControllers };
