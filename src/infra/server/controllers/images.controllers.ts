import { Request, Response } from "express";

import { ICreateImageDTO } from "../../../core/dtos/image.dtos";

import { ImagesRepository } from "../../database/repositories/images.repository";
import { ImagesServices } from "../../../core/services/images.services";

const imagesRepository = new ImagesRepository();
const imagesServices = new ImagesServices(imagesRepository);

class ImagesController {
  async create(req: Request, res: Response): Promise<Response> {
    const { path, size, mimetype, filename } = req.file!;

    const imageDTO: ICreateImageDTO = {
      url: "",
      name: filename,
      file_path: path,
      file_size: size,
      format: mimetype,
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
