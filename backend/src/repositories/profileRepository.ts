import { AppDataSource } from "../data-source";
import { Profile } from "../entities/Profile";

export const profileRepository = AppDataSource.getRepository(Profile);
