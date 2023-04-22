import { Request, Response } from "express";

import { ICategoryDTO } from "../../../core/dtos/category.dto";

import { CategoriesRepository } from "../../database/repositories/categories.repository";
import { CategoriesServices } from "../../../core/services/categories.services";

const categoriesRepository = new CategoriesRepository();
const categoriesServices = new CategoriesServices(categoriesRepository);

class CategoriesControllers {
  async findAll(req: Request, res: Response): Promise<Response> {
    const all = await categoriesServices.findAll();

    return res.json(all);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const categoryDTO = req.body as ICategoryDTO;

    await categoriesServices.create(categoryDTO);

    return res.status(201).send();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    await categoriesServices.delete(id);

    return res.status(204).send();
  }
}

export { CategoriesControllers };
