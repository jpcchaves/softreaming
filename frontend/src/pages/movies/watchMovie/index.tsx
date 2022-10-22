import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../hooks/useApi";
import { Movie } from "../../../types/Movie";
import {
  MovieDetailsWrapper,
  WatchMoviePageContainer,
  MovieDetails,
  MovieTitle,
  MovieCategory,
  MovieInfo,
  MovieContainer,
  YoutubeIframe,
} from "./style";

const WatchMovie = () => {
  const { movieId } = useParams();
  const [movieBeingWatched, setMovieBeingWatcher] = useState<Movie>();

  const getToken = () => {
    const token = localStorage.getItem("authToken");
    return token;
  };

  const authToken = getToken();

  useEffect(() => {
    const fetchMovieBeingWatched = async () => {
      try {
        const movie = await api.get(`/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setMovieBeingWatcher(movie.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieBeingWatched();
  }, []);

  return (
    <WatchMoviePageContainer>
      <MovieDetailsWrapper>
        <MovieDetails>
          <MovieTitle>
            {movieBeingWatched?.movieName} ({movieBeingWatched?.releaseDate})
          </MovieTitle>
          <MovieCategory>
            {movieBeingWatched?.category}, {movieBeingWatched?.duration} min
          </MovieCategory>
          <MovieInfo>{movieBeingWatched?.description}</MovieInfo>
          <MovieInfo></MovieInfo>
        </MovieDetails>
      </MovieDetailsWrapper>
      <MovieContainer>
        <YoutubeIframe
          allowFullScreen
          width="560"
          height="315"
          src={movieBeingWatched?.movie_url}
          title="YouTube video player"
          allow="accelerometer; autoplay; gyroscope; picture-in-picture"
        ></YoutubeIframe>
      </MovieContainer>
    </WatchMoviePageContainer>
  );
};

export default WatchMovie;