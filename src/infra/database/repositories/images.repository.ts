import { Repository } from "typeorm";

import { IImageDTO } from "../../../core/dtos/image.dto";
import { IImagesRepository } from "../../../core/interfaces/imagesRepository.interface";

import { appDataSource } from "..";

import { Image } from "../entities/image.entity";

class ImagesRepository implements IImagesRepository {
  private repository: Repository<Image>;

  constructor() {
    this.repository = appDataSource.getRepository(Image);
  }
  async findOneById(id: string): Promise<Image | undefined> {
    const image = await this.repository.findOneBy({ id });
    return image !== null ? image : undefined;
  }

  async create(imageDTO: IImageDTO): Promise<Image> {
    const user = this.repository.create(imageDTO);
    return await this.repository.save(user);
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { ImagesRepository };
