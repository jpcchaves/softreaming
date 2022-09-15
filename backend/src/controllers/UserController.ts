import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

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

  async getProfile(req: Request, res: Response) {
    return res.status(200).json(req.user);
  }
}
