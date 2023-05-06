import { ICreateServiceImageDTO } from "../dtos/serviceImage.dtos";

import { ServiceImage } from "../../infra/database/entities/serviceImage.entity";

export interface IServicesImagesRepository {
  findOneById(id: string): Promise<ServiceImage | undefined>;
  create({}: ICreateServiceImageDTO): Promise<ServiceImage>;
  delete(id: string): Promise<void>;
}
