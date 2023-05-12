import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Service } from "./service.entity";

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

  @Column({ type: "varchar", nullable: true })
  avatar?: string | null;

  @Column({ type: "varchar", nullable: true })
  avatar_url?: string | null;

  @CreateDateColumn()
  created_at!: Date;

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
