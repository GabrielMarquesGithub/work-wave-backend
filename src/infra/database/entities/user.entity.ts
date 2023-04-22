import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Service } from "./service.entity";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @Column()
  image_url?: string;

  @Column()
  cep?: string;

  @CreateDateColumn()
  created_at?: Date;

  //relationship with other classes

  @OneToMany(() => Service, (service) => service.user)
  services?: Service[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
