import { Category } from "../../infra/database/entities/category.entity";
//Vejo como uma boa abordagem a manutenção dos tipos gerais dentro deste tipo de arquivo

//DTO ou VO
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category | undefined;
  findAll(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
