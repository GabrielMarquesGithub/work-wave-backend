import { ICreateServiceImageDTO } from "../dtos/serviceImage.dtos";

import { ServiceImage } from "../database/entities/serviceImage.entity";

export interface IServicesImagesRepository {
  findOneById(id: string): Promise<ServiceImage | null>;
  create({}: ICreateServiceImageDTO): Promise<ServiceImage>;
  delete(id: string): Promise<void>;
}
