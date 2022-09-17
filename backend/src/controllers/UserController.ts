import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { profileRepository } from "../repositories/profileRepository";

export class UserController {
  async createUser(req: Request, res: Response) {
    const { userName, email, password } = req.body;

    const userAlreadyExists = await userRepository.findOneBy({ email });

    if (userAlreadyExists) {
      return res.status(400).json({ message: "Email já cadastrado!" });
    }

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const createNewUser = userRepository.create({
        userName,
        email,
        password: hashPassword,
      });

      await userRepository.save(createNewUser);

      const { password: _, ...newUserData } = createNewUser;

      return res.status(201).json(newUserData);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createProfile(req: Request, res: Response) {
    const { profileName, profileUrlImage } = req.body;
    const { idUser } = req.params;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
      }

      const findUser = await userRepository.findOneBy({
        id: Number(idUser),
      });

      if (!findUser) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      const { password: _, ...user } = findUser;
      
      const newProfile = profileRepository.create({
        profileName,
        profileUrlImage,
        user,
      });
      
      await profileRepository.save(newProfile);

      return res.status(201).json(newProfile);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Sever Error" });
    }
  }

  async authenticateUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await userRepository.findOneBy({ email });

    if (!userExists) {
      return res.status(400).json({ message: "Email ou senha inválidos!" });
    }

    try {
      const user = userExists;

      const verifyPassword = await bcrypt.compare(password, user.password);

      if (!verifyPassword) {
        return res.status(400).json({ message: "Email ou senha inválidos!" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
        expiresIn: "8h",
      });

      const { password: _, ...userLogin } = user;

      return res.json({
        user: userLogin,
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUser(req: Request, res: Response) {
    return res.status(200).json(req.user);
  }

  async getProfiles(req: Request, res: Response) {
    const { idUser } = req.params;

    const findUser = await userRepository.findOneBy({
      id: Number(idUser),
    });

    if (!findUser) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    try {
      const profiles = await userRepository.find({
        relations: {
          profiles: true,
        },
      });

      const { password: _, ...profilesList } = profiles[0];

      return res.json(profilesList);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
