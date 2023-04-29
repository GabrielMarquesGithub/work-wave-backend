import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "./user.entity";

// Usar o operador "!" para indicar que no database esse propriedade é obrigatória

@Entity("users_tokens")
class UserToken {
  @PrimaryColumn()
  id!: string;

  @Column()
  refresh_token!: string;

  @Column()
  expires_date!: Date;

  @CreateDateColumn()
  created_at!: Date;

  //relationship with other classes

  @Column()
  user_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserToken };
