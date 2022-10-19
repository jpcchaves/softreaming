// hooks
import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
// icons
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
// components
import ErrorMessageComponent from "../../../components/errorMessage";
import LoadingSpan from "../../../components/loadingSpan";
// context
import { AuthContext } from "../../../contexts/auth/AuthContext";
// axios
import { api } from "../../../hooks/useApi";
// types
import { AllMovies } from "../../../types/Movie";
// styled components
import {
  ButtonsWrapper,
  DeleteButton,
  EditButton,
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

  const auth = useContext(AuthContext);

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
        const currentMovies = movies.data;
        setAllMovies(currentMovies);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(
          "Ocorreu um erro ao carregar os filmes... Tente novamente mais tarde."
        );
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  const handleDeleteMovie = async (id?: number) => {
    if (!auth.user) return <Navigate to="/login" />;

    try {
      if (
        window.confirm("Você irá deletar um filme. Deseja confirmar?") === true
      ) {
        await api.delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const remainingMovies = allMovies.filter((movie) => {
          return movie.id !== id;
        });
        setAllMovies(remainingMovies);
      } else {
        return;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

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
              {auth.user?.role === "admin" && (
                <ButtonsWrapper>
                  <EditButton>
                    <BsFillPencilFill />
                  </EditButton>
                  <DeleteButton onClick={() => handleDeleteMovie(movie.id)}>
                    <BsFillTrashFill />
                  </DeleteButton>
                </ButtonsWrapper>
              )}
            </MovieBannerWrapper>
          ))}
      </MoviesWrapper>
    </MoviesHomePageContainer>
  );
};

export default MoviesPage;
