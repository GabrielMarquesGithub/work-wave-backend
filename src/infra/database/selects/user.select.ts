import { FindOptionsSelect } from "typeorm";

import { User } from "../entities/user.entity";

const userSelect: FindOptionsSelect<User> = {
  id: true,
  name: true,
  email: true,
  phone: true,
  cep: true,
  avatar_url: true,
};
