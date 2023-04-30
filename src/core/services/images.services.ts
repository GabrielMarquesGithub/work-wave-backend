import { IImagesRepository } from "../interfaces/imagesRepository.interface";
import { IImageDTO } from "../dtos/image.dto";

import { AppError } from "../errors/app.error";
import { Image } from "../../infra/database/entities/image.entity";

class ImagesServices {
  private imagesRepository: IImagesRepository;

  constructor(imagesRepository: IImagesRepository) {
    this.imagesRepository = imagesRepository;
  }

  async create(imageDTO: IImageDTO): Promise<Image> {
    return await this.imagesRepository.create(imageDTO);
  }

  async delete(id: string): Promise<void> {
    const image = await this.imagesRepository.findOneById(id);

    if (!image) {
      throw new AppError("Image does not exist", 404);
    }

    await this.imagesRepository.delete(id);
  }
}

export { ImagesServices };
