import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Service } from "./service.entity";
import { Image } from "./image.entity";

// Usar o operador "!" para indicar que no database esse propriedade é obrigatória

@Entity("users")
class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  password!: string;

  @Column()
  cep!: string;

  @CreateDateColumn()
  created_at!: Date;

  //relationship with other classes
  @Column()
  image_id?: string;

  @OneToOne(() => Image)
  @JoinColumn({ name: "image_id" })
  image?: Image;

  @OneToMany(() => Service, (service) => service.user)
  services?: Service[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
