import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";

type JwtPayload = {
  id: number;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  const token = authorization && authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  if (!token) return res.status(401).json({ message: "Acesso negado!" });

  try {
    const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;

    const userExists = await userRepository.findOneBy({ id });

    if (!userExists) {
      return res.status(401).json({ message: "Não autorizado!" });
    }

    const { password: _, ...loggedUser } = userExists;

    req.user = loggedUser;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Token inválido!" });
  }
};
