import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "./user.entity";
import { Category } from "./category.entity";

@Entity("services")
class Service {
  @PrimaryColumn()
  id?: string;

  @Column()
  name?: string;

  @Column()
  price?: number;

  @Column()
  description?: string;

  @Column()
  observation?: string;

  @Column()
  image_url?: string;

  @Column()
  priority?: string;

  @CreateDateColumn()
  created_at?: Date;

  //relationship with other classes

  @ManyToOne(() => User, (user) => user.services)
  user?: User;

  @ManyToOne(() => Category, (category) => category.services)
  category?: User;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Service };
