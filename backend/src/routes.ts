import { Router } from "express";
import { MovieController } from "./controllers/MovieController";
import { UserController } from "./controllers/UserController";
// middlewares
import { authMiddleware } from "./middlewares/authMiddleware";
// validations
import { movieValidate } from "./validations/movieValidations";
import { userValidate } from "./validations/userValidations";
import { profileValidation } from "./validations/profileValidations";

const routes = Router();

// movie routes
routes.post("/movie", movieValidate, new MovieController().createMovie);
routes.get("/movies", new MovieController().getAllMovies);
routes.delete("/movies/:movieId", new MovieController().deleteMovie);
routes.put(
  "/movies/:movieId",
  movieValidate,
  new MovieController().updateMovie
);

// user routes
routes.post("/user", userValidate, new UserController().createUser);
routes.get("/user", authMiddleware, new UserController().getUser);
routes.post(
  "/user/:idUser/profiles",
  profileValidation,
  new UserController().createProfile
);
routes.get("/user/:idUser/profiles", new UserController().getProfiles);
routes.post("/login", new UserController().authenticateUser);

export default routes;
