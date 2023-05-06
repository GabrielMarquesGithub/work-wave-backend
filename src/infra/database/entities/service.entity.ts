import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "./user.entity";
import { Category } from "./category.entity";
import { ServiceImage } from "./serviceImage.entity";

@Entity("services")
class Service {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  description?: string;

  @Column()
  observation?: string;

  @Column()
  order!: number;

  @CreateDateColumn()
  created_at!: Date;

  //relationship with other classes
  @Column()
  user_id!: string;

  @Column()
  category_id?: string;

  @ManyToOne(() => User, (user) => user.services)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Category, (category) => category.services)
  @JoinColumn({ name: "category_id" })
  category?: User;

  @OneToMany(() => ServiceImage, (serviceImage) => serviceImage.service)
  images?: ServiceImage[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Service };
