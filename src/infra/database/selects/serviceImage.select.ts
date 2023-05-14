import { FindOptionsSelect } from "typeorm";

import { ServiceImage } from "../entities/serviceImage.entity";

export const serviceImageSelect: FindOptionsSelect<ServiceImage> = {
  id: true,
  name: true,
  url: true,
};
