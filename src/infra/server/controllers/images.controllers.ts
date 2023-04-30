import { Request, Response } from "express";

import { IImageDTO } from "../../../core/dtos/image.dto";

import { ImagesRepository } from "../../database/repositories/images.repository";
import { ImagesServices } from "../../../core/services/images.services";

const imagesRepository = new ImagesRepository();
const imagesServices = new ImagesServices(imagesRepository);

class ImagesController {
  async create(req: Request, res: Response): Promise<Response> {
    const { path, size, mimetype } = req.file!;

    const imageDTO: IImageDTO = {
      file_path: path,
      file_size: size,
      format: mimetype,
      height: 0,
      width: 0,
    };

    const image = await imagesServices.create(imageDTO);

    return res.json(image);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    await imagesServices.delete(id);

    return res.status(204).send();
  }
}

export { ImagesController };
