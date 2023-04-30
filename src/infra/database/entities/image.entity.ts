import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("images")
class Image {
  @PrimaryColumn()
  id!: string;

  @Column()
  file_path!: string;

  @Column()
  file_size!: number;

  @Column()
  width!: number;

  @Column()
  height!: number;

  @Column()
  format!: string;

  @CreateDateColumn()
  created_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Image };
