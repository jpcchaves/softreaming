// hooks
import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
// icons
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsFillPlayBtnFill,
  BsSearch,
  BsXLg,
} from "react-icons/bs";
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
  MoviesHomePageContainer,
  MoviesPageErrorWrapper,
  MoviesPageTitle,
  MoviesWrapper,
  WatchMovieButton,
  SearchbarWrapper,
  SearchIconWrapper,
  SearchInput,
  SearchInputWrapper,
  NoMoviesFoundMessage,
} from "./style";

const MoviesPage: React.FC = () => {
  const [allMovies, setAllMovies] = useState<AllMovies>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<AllMovies>([]);
  const [searchWord, setSearchWord] = useState("");
  const [page, setPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<number>(0);
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

  const handleFilter = (e: { target: { value: string } }) => {
    setSearchWord(e.target.value);
    const newFilter = allMovies.filter((value) => {
      return value.movieName.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredData(newFilter);
  };

  const handleInputCleanup = () => {
    setFilteredData([]);
    setSearchWord("");
  };

  return (
    <MoviesHomePageContainer>
      <MoviesPageTitle>Confira nossos filmes!</MoviesPageTitle>
      <SearchbarWrapper>
        <SearchInputWrapper>
          <SearchInput
            type="text"
            placeholder="Busque um filme pelo nome..."
            onChange={handleFilter}
            value={searchWord}
          />
          <SearchIconWrapper>
            {searchWord ? <BsXLg onClick={handleInputCleanup} /> : <BsSearch />}
          </SearchIconWrapper>
        </SearchInputWrapper>
      </SearchbarWrapper>
      {!isLoading && errorMessage && (
        <MoviesPageErrorWrapper>
          <ErrorMessageComponent errorMessage={errorMessage} />
        </MoviesPageErrorWrapper>
      )}
      <MoviesWrapper>
        {isLoading && <LoadingSpan />}

        {!searchWord
          ? !isLoading &&
            allMovies &&
            allMovies.map((movie) => (
              <MovieBannerWrapper key={movie.id}>
                <MoviePosterWrapper>
                  <MoviePoster src={movie.poster_url} />
                </MoviePosterWrapper>
                <MovieName>
                  {movie.movieName} ({movie.releaseDate})
                </MovieName>
                <MovieCategory>Categoria: {movie.category}</MovieCategory>
                <ButtonsWrapper>
                  <WatchMovieButton to={`/br/watch/${movie.id}`}>
                    <BsFillPlayBtnFill />
                  </WatchMovieButton>
                  {auth.user?.role === "admin" && (
                    <>
                      <EditButton to={`/br/movie/${movie.id}`}>
                        <BsFillPencilFill />
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteMovie(movie.id)}>
                        <BsFillTrashFill />
                      </DeleteButton>
                    </>
                  )}
                </ButtonsWrapper>
              </MovieBannerWrapper>
            ))
          : filteredData &&
            filteredData.map((movie) => (
              <MovieBannerWrapper key={movie.id}>
                <MoviePosterWrapper>
                  <MoviePoster src={movie.poster_url} />
                </MoviePosterWrapper>
                <MovieName>
                  {movie.movieName} ({movie.releaseDate})
                </MovieName>
                <MovieCategory>Categoria: {movie.category}</MovieCategory>
                <ButtonsWrapper>
                  <WatchMovieButton to={`/br/watch/${movie.id}`}>
                    <BsFillPlayBtnFill />
                  </WatchMovieButton>
                  {auth.user?.role === "admin" && (
                    <>
                      <EditButton to={`/br/movie/${movie.id}`}>
                        <BsFillPencilFill />
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteMovie(movie.id)}>
                        <BsFillTrashFill />
                      </DeleteButton>
                    </>
                  )}
                </ButtonsWrapper>
              </MovieBannerWrapper>
            ))}
        {filteredData.length == 0 && searchWord.length > 0 && (
          <NoMoviesFoundMessage>
            Não encontramos nenhum filme com esse nome =(
          </NoMoviesFoundMessage>
        )}
      </MoviesWrapper>
    </MoviesHomePageContainer>
  );
};

export default MoviesPage;
