import { Repository } from "typeorm";

import { ICreateImageDTO } from "../../../core/dtos/image.dtos";
import { IImagesRepository } from "../../../core/interfaces/imagesRepository.interface";

import { appDataSource } from "..";

import { Image } from "../entities/serviceImage.entity";

class ImagesRepository implements IImagesRepository {
  private repository: Repository<Image>;

  constructor() {
    this.repository = appDataSource.getRepository(Image);
  }
  async findOneById(id: string): Promise<Image | undefined> {
    const image = await this.repository.findOneBy({ id });
    return image !== null ? image : undefined;
  }

  async create(imageDTO: ICreateImageDTO): Promise<Image> {
    const user = this.repository.create(imageDTO);
    return await this.repository.save(user);
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { ImagesRepository };
