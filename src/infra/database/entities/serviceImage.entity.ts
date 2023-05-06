import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Service } from "./service.entity";

@Entity("services_images")
class ServiceImage {
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

  @ManyToOne(() => Service, (service) => service.images)
  @JoinColumn({ name: "service_id" })
  service!: Service;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { ServiceImage };
