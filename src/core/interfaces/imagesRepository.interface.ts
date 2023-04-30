import { IImageDTO } from "../dtos/image.dto";

import { Image } from "../../infra/database/entities/image.entity";

export interface IImagesRepository {
  findOneById(id: string): Promise<Image | undefined>;
  create({}: IImageDTO): Promise<Image>;
  delete(id: string): Promise<void>;
}
