import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("services_images")
class Image {
  @PrimaryColumn()
  id!: string;

  @Column()
  url!: string;

  @Column()
  name!: string;

  @Column()
  file_size!: number;

  @Column()
  format!: string;

  @CreateDateColumn()
  created_at!: Date;

  //relationship with other classes
  @Column()
  service_id!: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Image };
