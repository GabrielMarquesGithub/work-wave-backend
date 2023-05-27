import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
  discount!: number;

  @Column({ type: "varchar", nullable: true })
  description!: string | null;

  @Column({ type: "varchar", nullable: true })
  observation!: string | null;

  @Column()
  order!: number;

  @CreateDateColumn()
  created_at!: Date;

  //relationship with other classes
  @Column()
  user_id!: string;

  @Column({ type: "varchar", nullable: true })
  category_id!: string | null;

  @ManyToOne(() => User, (user) => user.services)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Category, (category) => category.services)
  @JoinColumn({ name: "category_id" })
  category!: User | null;

  @OneToMany(() => ServiceImage, (serviceImage) => serviceImage.service)
  images!: ServiceImage[] | null;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Service };
