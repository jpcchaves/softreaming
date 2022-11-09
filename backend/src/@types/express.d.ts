import { Profile } from "../entities/Profile";
import { User } from "../entities/User";

declare global {
  namespace Express {
    export interface Request {
      user: Partial<User>;
      profile: Partial<Profile>;
    }
  }
}
