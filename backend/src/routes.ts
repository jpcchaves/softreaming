import { Router } from "express";
import { MovieController } from "./controllers/MovieController";
import { UserController } from "./controllers/UserController";
// middlewares
import { authMiddleware } from "./middlewares/authMiddleware";
// validations
import { movieValidate } from "./validations/movieValidations";
import { userValidate } from "./validations/userValidations";
import { profileValidation } from "./validations/profileValidations";
import { updateUserValidate } from "./validations/updateUserValidation";

const routes = Router();

// movie routes
routes.post(
  "/movie",
  authMiddleware,
  movieValidate,
  new MovieController().createMovie
);
routes.get("/movies", authMiddleware, new MovieController().getAllMovies);
routes.get(
  "/movie/:movieId",
  authMiddleware,
  new MovieController().getOneMovie
);
routes.delete(
  "/movies/:movieId",
  authMiddleware,
  new MovieController().deleteMovie
);
routes.put(
  "/movies/:movieId",
  authMiddleware,
  movieValidate,
  new MovieController().updateMovie
);

// user routes
routes.post("/user", userValidate, new UserController().createUser);
routes.get("/user", authMiddleware, new UserController().getUser);
routes.put(
  "/user/:idUser",
  authMiddleware,
  updateUserValidate,
  new UserController().updateUser
);
routes.post("/login", new UserController().authenticateUser);
routes.post(
  "/user/:idUser/profiles",
  authMiddleware,
  profileValidation,
  new UserController().createProfile
);
routes.get(
  "/user/:idUser/profiles",
  authMiddleware,
  new UserController().getProfiles
);
routes.delete(
  "/profiles/:idUser/:profileId",
  authMiddleware,
  new UserController().deleteProfile
);
routes.put(
  "/profiles/:idUser/:profileId",
  authMiddleware,
  profileValidation,
  new UserController().updateProfile
);

export default routes;
