import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text" })
  profileName: string;
  @Column({ type: "text" })
  profileUrlImage: string;

  @ManyToOne(() => User, (user) => user.profiles)
  @JoinColumn({ name: "user_id" })
  user: User;
}
