// hooks
import { useEffect, useState } from "react";
import ErrorMessageComponent from "../../../components/errorMessage";
import LoadingSpan from "../../../components/loadingSpan";
// axios
import { api } from "../../../hooks/useApi";
// types
import { AllMovies } from "../../../types/Movie";
// styled components
import {
  MovieBannerWrapper,
  MovieCategory,
  MovieName,
  MoviePoster,
  MoviePosterWrapper,
  MovieReleaseDate,
  MoviesHomePageContainer,
  MoviesPageErrorWrapper,
  MoviesPageTitle,
  MoviesWrapper,
} from "./style";

const MoviesPage: React.FC = () => {
  const [allMovies, setAllMovies] = useState<AllMovies>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getToken = () => {
    const token = localStorage.getItem("authToken");
    return token;
  };

  const authToken = getToken();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const movies = await api.get("/movies", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setAllMovies(movies.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(
          "Ocorreu um erro ao carregar os filmes... Tente novamente mais tarde."
        );
        // console.log(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <MoviesHomePageContainer>
      <MoviesPageTitle>Confira nossos filmes!</MoviesPageTitle>
      {!isLoading && errorMessage && (
        <MoviesPageErrorWrapper>
          <ErrorMessageComponent errorMessage={errorMessage} />
        </MoviesPageErrorWrapper>
      )}
      <MoviesWrapper>
        {isLoading && <LoadingSpan />}
        {!isLoading &&
          allMovies &&
          allMovies.map((movie) => (
            <MovieBannerWrapper key={movie.id}>
              <MoviePosterWrapper>
                <MoviePoster src={movie.poster_url} />
              </MoviePosterWrapper>
              <MovieName>{movie.movieName}</MovieName>
              <MovieCategory>{movie.category}</MovieCategory>
              <MovieReleaseDate>{movie.releaseDate}</MovieReleaseDate>
            </MovieBannerWrapper>
          ))}
      </MoviesWrapper>
    </MoviesHomePageContainer>
  );
};

export default MoviesPage;
