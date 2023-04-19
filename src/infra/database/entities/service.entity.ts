import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

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

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Service };
