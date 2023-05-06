import { Repository } from "typeorm";

import { ICreateServiceImageDTO } from "../../../core/dtos/serviceImage.dtos";
import { IServicesImagesRepository } from "../../../core/interfaces/servicesImagesRepository.interface";

import { appDataSource } from "..";

import { ServiceImage } from "../entities/serviceImage.entity";

class ServicesImagesRepository implements IServicesImagesRepository {
  private repository: Repository<ServiceImage>;

  constructor() {
    this.repository = appDataSource.getRepository(ServiceImage);
  }

  async findOneById(id: string): Promise<ServiceImage | undefined> {
    const image = await this.repository.findOneBy({ id });
    return image !== null ? image : undefined;
  }

  async create(imageDTO: ICreateServiceImageDTO): Promise<ServiceImage> {
    const user = this.repository.create(imageDTO);
    return await this.repository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { ServicesImagesRepository };
