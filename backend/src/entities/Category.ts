import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Movie } from "./Movie";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "timestamp", default: "now()" })
  created_at: number;

  @OneToMany(() => Movie, (movie) => movie.category)
  movies: Movie[];
}
