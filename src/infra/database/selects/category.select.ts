import { FindOptionsSelect } from "typeorm";

import { Category } from "../entities/category.entity";

export const categorySelect: FindOptionsSelect<Category> = {
  id: true,
  name: true,
  description: true,
  icon_url: true,
};
