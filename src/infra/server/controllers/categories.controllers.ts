import { Request, Response } from "express";

import { CategoriesRepository } from "../../database/repositories/categories.repository";
import { CategoriesServices } from "../../../core/services/categories.services";

const categoriesRepository = new CategoriesRepository();
const categoriesServices = new CategoriesServices(categoriesRepository);

class CategoriesControllers {
  findAll(req: Request, res: Response): Response {
    const all = categoriesServices.findAll();

    return res.json(all);
  }

  create(req: Request, res: Response): Response {
    const { name, description } = req.body;

    categoriesServices.create({ name, description });

    return res.status(201).send();
  }
}

export { CategoriesControllers };
