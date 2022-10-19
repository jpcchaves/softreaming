export interface Movie {
  id?: number;
  movieName: string;
  category: string;
  description: string;
  duration: string;
  releaseDate: string;
  movie_url: string;
  poster_url: string;
}

export interface AllMovies extends Array<Movie> {}
