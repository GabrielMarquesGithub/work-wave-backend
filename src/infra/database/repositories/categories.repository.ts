import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../../core/interfaces/categories.repository.interface";
import { Category } from "../entities/category.entity";

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  findByName(name: string): Category | undefined {
    return this.categories.find((category) => category.name === name);
  }

  findAll(): Category[] {
    return this.categories;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category);
  }
}

export { CategoriesRepository };
