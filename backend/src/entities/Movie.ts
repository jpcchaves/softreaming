import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("movies")
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  movieName: string;

  @Column({ type: "text" })
  category: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  duration: string;

  @Column({ type: "text" })
  releaseDate: string;

  @Column({ type: "text" })
  movie_url: string;

  @Column({ type: "text" })
  poster_url: string;
}
