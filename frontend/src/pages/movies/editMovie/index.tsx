// hooks
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../hooks/useApi";
import { FieldValues, useForm } from "react-hook-form";
// yup
import { yupResolver } from "@hookform/resolvers/yup";
import { movieSchemaValidation } from "../../../validations/movieSchemaValidation";
// components
import ErrorMessageComponent from "../../../components/errorMessage";
import FormErrorMessage from "../../../components/formErrorMessage";
import {
  FormInput,
  FormInputSubmit,
} from "../../../components/inputStyledComponent/style";
import LoadingSpan from "../../../components/loadingSpan";
import SuccessMessageComponent from "../../../components/successMessage";
// styled components
import {
  EditMovieForm,
  EditMovieFormWrapper,
  EditMoviePageWrapper,
  FormTitle,
} from "./style";
// context
import { AuthContext } from "../../../contexts/auth/AuthContext";
// types
import { Movie } from "../../../types/Movie";

const EditMovie = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [movieBeingEdited, setMovieBeingEdited] = useState<Movie>();
  const navigate = useNavigate();
  const { movieId } = useParams();

  const auth = useContext(AuthContext);
  if (!auth.user) return <Navigate to="/login" />;

  const getToken = () => {
    const token = localStorage.getItem("authToken");
    return token;
  };
  const authToken = getToken();

  useEffect(() => {
    const getMovieBeingEdited = async () => {
      const movie = await api.get(`/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMovieBeingEdited(movie.data);
    };
    getMovieBeingEdited();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm({
    resolver: yupResolver(movieSchemaValidation),
  });

  const submitForm = async (data: FieldValues) => {
    setIsLoading(true);
    const {
      movieName,
      category,
      description,
      duration,
      releaseDate,
      movie_url,
      poster_url,
    } = data;

    const newMovieData: Movie = {
      movieName,
      category,
      description,
      duration,
      releaseDate,
      movie_url,
      poster_url,
    };

    try {
      await api.put(`/movies/${movieId}`, newMovieData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setSuccessMessage("Filme editado com sucesso!");

      reset();
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/br/movies");
      }, 1000);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      if (error) {
        setErrorMessage("Ocorreu um erro ao editar o filme...");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      setIsLoading(false);
    }
  };
  setTimeout(() => {
    setFocus("movieName", {
      shouldSelect: false,
    });
  }, 1);
  setTimeout(() => {
    setFocus("category", {
      shouldSelect: false,
    });
  }, 2);
  setTimeout(() => {
    setFocus("description", {
      shouldSelect: false,
    });
  }, 3);
  setTimeout(() => {
    setFocus("duration", {
      shouldSelect: false,
    });
  }, 4);
  setTimeout(() => {
    setFocus("description", {
      shouldSelect: false,
    });
  }, 5);
  setTimeout(() => {
    setFocus("releaseDate", {
      shouldSelect: false,
    });
  }, 6);
  setTimeout(() => {
    setFocus("movie_url", {
      shouldSelect: false,
    });
  }, 7);
  setTimeout(() => {
    setFocus("poster_url", {
      shouldSelect: false,
    });
  }, 8);

  return (
    <EditMoviePageWrapper>
      <EditMovieFormWrapper>
        <FormTitle>Editando o filme: {movieBeingEdited?.movieName}</FormTitle>
        <EditMovieForm onSubmit={handleSubmit(submitForm)}>
          <FormInput
            type="text"
            placeholder={movieBeingEdited?.movieName || ""}
            defaultValue={movieBeingEdited?.movieName || ""}
            {...register("movieName")}
          />
          {errors.movieName && (
            <FormErrorMessage message={errors.movieName?.message} />
          )}
          <FormInput
            type="text"
            placeholder={movieBeingEdited?.category || ""}
            defaultValue={movieBeingEdited?.category || ""}
            {...register("category")}
          />
          {errors.category && (
            <FormErrorMessage message={errors.category?.message} />
          )}
          <FormInput
            type="text"
            placeholder={movieBeingEdited?.description || ""}
            defaultValue={movieBeingEdited?.description || ""}
            {...register("description")}
          />
          {errors.description && (
            <FormErrorMessage message={errors.description?.message} />
          )}
          <FormInput
            type="text"
            placeholder={movieBeingEdited?.duration || ""}
            defaultValue={movieBeingEdited?.duration || ""}
            {...register("duration")}
          />
          {errors.duration && (
            <FormErrorMessage message={errors.duration?.message} />
          )}
          <FormInput
            type="text"
            placeholder={movieBeingEdited?.releaseDate || ""}
            defaultValue={movieBeingEdited?.releaseDate || ""}
            {...register("releaseDate")}
          />
          {errors.releaseDate && (
            <FormErrorMessage message={errors.releaseDate?.message} />
          )}
          <FormInput
            type="text"
            placeholder={movieBeingEdited?.movie_url || ""}
            defaultValue={movieBeingEdited?.movie_url || ""}
            {...register("movie_url")}
          />
          {errors.movie_url && (
            <FormErrorMessage message={errors.movie_url?.message} />
          )}
          <FormInput
            type="text"
            placeholder={movieBeingEdited?.poster_url || ""}
            defaultValue={movieBeingEdited?.poster_url || ""}
            {...register("poster_url")}
          />
          {errors.poster_url && (
            <FormErrorMessage message={errors.poster_url?.message} />
          )}

          {successMessage && (
            <SuccessMessageComponent successMessage={successMessage} />
          )}

          {errorMessage && (
            <ErrorMessageComponent errorMessage={errorMessage} />
          )}

          {isLoading && <LoadingSpan />}

          {!isLoading && <FormInputSubmit type="submit" value="Editar Filme" />}
        </EditMovieForm>
      </EditMovieFormWrapper>
    </EditMoviePageWrapper>
  );
};

export default EditMovie;
