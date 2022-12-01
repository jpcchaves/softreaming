/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { profileRepository } from '../repositories/profileRepository';

import { BadRequestError } from '../helpers/apiErrors';

export class UserController {
  async createUser(req: Request, res: Response) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { msg }: {msg: string} = errors.array()[0];

      throw new BadRequestError(msg);

    }

    const { userName, email, password, role } = req.body;

    const userAlreadyExists = await userRepository.findOneBy({ email });

    if (userAlreadyExists) {
      throw new BadRequestError('Email já cadastrado');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createNewUser = userRepository.create({
      userName,
      email,
      password: hashPassword,
      role,
    });

    await userRepository.save(createNewUser);

    const { password: _, ...newUserData } = createNewUser;

    return res.status(201).json(newUserData);
  }

  async updateUser(req: Request, res: Response) {
    const { userName, password } = req.body;
    const { idUser } = req.params;

    const hashPassword = await bcrypt.hash(password, 10);

    const updatedUser = {
      userName,
      password: hashPassword,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...updtedUserData } = updatedUser;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { msg }: {msg: string} = errors.array()[0];

      throw new BadRequestError(msg);
    }

    const findUser = await userRepository.findOneBy({
      id: Number(idUser),
    });

    if (!findUser) {
      throw new BadRequestError('Usuário não encontrado!');
    }

    await userRepository.update(idUser, updatedUser);

    return res.status(201).json(updtedUserData);
  }

  async createProfile(req: Request, res: Response) {
    const { profileName } = req.body;
    const { idUser } = req.params;
    const profileUrlImage = req.app.locals.urlProfileS3;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { msg }: {msg: string} = errors.array()[0];

      throw new BadRequestError(msg);
    }

    const findUser = await userRepository.findOneBy({
      id: Number(idUser),
    });

    if (!findUser) {
      throw new BadRequestError('Usuário não encontrado!');
    }

    const profiles = await userRepository.find({
      relations: {
        profiles: true,
      },
      where: {
        id: Number(idUser),
      },
    });

    const profilesAmount = profiles[0].profiles.length;

    if (profilesAmount >= 4) {
      throw new BadRequestError('Limite de usuários excedido!');
    }

    const { password: _, ...user } = findUser;

    const newProfile = profileRepository.create({
      profileName,
      profileUrlImage,
      user,
    });

    await profileRepository.save(newProfile);

    return res.status(201).json(newProfile);
  }

  async authenticateUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await userRepository.findOneBy({ email });

    if (!userExists) {
      throw new BadRequestError('Email ou senha inválidos!');
    }

    const user = userExists;

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new BadRequestError('Email ou senha inválidos!');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
      expiresIn: '7d',
    });

    const { password: _, ...userLogin } = user;

    return res.json({
      user: userLogin,
      token: token,
    });
  }

  async getUser(req: Request, res: Response) {
    const user = req.user;
    return res.status(200).json(user);
  }

  async getProfiles(req: Request, res: Response) {
    const { idUser } = req.params;

    const findUser = await userRepository.findOneBy({
      id: Number(idUser),
    });

    if (!findUser) {
      throw new BadRequestError('Usuário não encontrado!');
    }

    const profiles = await userRepository.find({
      relations: {
        profiles: true,
      },
      where: {
        id: Number(idUser),
      },
    });

    const { password: _, ...profilesList } = profiles[0];

    return res.json(profilesList);
  }

  async deleteProfile(req: Request, res: Response) {
    const { profileId } = req.params;

    if (!(await profileRepository.findOneBy({ id: Number(profileId) }))) {
      throw new BadRequestError('Perfil não encontrado');
    }

    await profileRepository.delete(profileId);
    res.status(204).end();
  }

  async updateProfile(req: Request, res: Response) {
    const { profileId } = req.params;
    const { profileName } = req.body;

    const profileUrlImage = req.app.locals.urlProfileS3;

    if (!profileUrlImage) {
      throw new BadRequestError('A imagem de perfil é obrigatória!');
    }

    if (!(await profileRepository.findOneBy({ id: Number(profileId) }))) {
      throw new BadRequestError('Perfil não encontrado');
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { msg }: {msg: string} = errors.array()[0];

      throw new BadRequestError(msg);
    }

    const updatedProfile = {
      profileName,
      profileUrlImage,
    };

    await profileRepository.update(profileId, updatedProfile);

    return res.status(201).json(updatedProfile);
  }
}
