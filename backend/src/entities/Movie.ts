import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./Category";

@Entity("movies")
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "uuid" })
  category_id: number;

  @Column({ type: "numeric" })
  duration: number;

  @ManyToOne(() => Category, (category) => category.movies)
  @JoinColumn({ name: "category_id" })
  category: Category;
}
