import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../hooks/useApi";
import { Movie } from "../../../types/Movie";
import { WatchMoviePageContainer } from "./style";

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
      console.log(movieId);
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

  console.log(movieBeingWatched);

  return (
    <WatchMoviePageContainer>
      <div>{movieBeingWatched?.movieName}</div>
      <div>{movieBeingWatched?.category}</div>
      <div>{movieBeingWatched?.duration}</div>
      <div>{movieBeingWatched?.description}</div>
      <div>{movieBeingWatched?.releaseDate}</div>
      <div>
        <iframe
          width="560"
          height="315"
          src={movieBeingWatched?.movie_url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    </WatchMoviePageContainer>
  );
};

export default WatchMovie;
