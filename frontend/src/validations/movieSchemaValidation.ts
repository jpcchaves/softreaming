import * as yup from "yup";
import "./yupTranslations";

export const movieSchemaValidation = yup.object().shape({
  movieName: yup.string().min(3).required(),
  category: yup.string().min(3).required(),
  description: yup.string().min(3).required(),
  duration: yup.string().required(),
  releaseDate: yup.string().required(),
  movie_url: yup.string().url().required(),
  poster_url: yup.string().url().required(),
});
