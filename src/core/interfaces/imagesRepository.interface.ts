import { ICreateImageDTO } from "../dtos/image.dtos";

import { Image } from "../../infra/database/entities/serviceImage.entity";

export interface IImagesRepository {
  findOneById(id: string): Promise<Image | undefined>;
  create({}: ICreateImageDTO): Promise<Image>;
  delete(id: string): Promise<void>;
}
