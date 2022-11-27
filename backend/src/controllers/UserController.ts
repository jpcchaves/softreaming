/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { profileRepository } from '../repositories/profileRepository';

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
      }

      const { userName, email, password, role } = req.body;

      const userAlreadyExists = await userRepository.findOneBy({ email });

      if (userAlreadyExists) {
        return res.status(400).json({ errors: 'Email já cadastrado!' });
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
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: 'Internal Server Error' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
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
        return res.status(400).json({ errors: errors.array() });
      }

      const findUser = await userRepository.findOneBy({
        id: Number(idUser),
      });

      if (!findUser) {
        return res.status(404).json({ errors: 'Usuário não encontrado!' });
      }

      await userRepository.update(idUser, updatedUser);

      return res.status(201).json(updtedUserData);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: 'Internal Sever Error' });
    }
  }

  async createProfile(req: Request, res: Response) {
    try {
      const { profileName } = req.body;
      const { idUser } = req.params;

      const profileUrlImage = req.app.locals.urlProfileS3;



      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
      }

      const findUser = await userRepository.findOneBy({
        id: Number(idUser),
      });

      if (!findUser) {
        return res.status(404).json({ errors: 'Usuário não encontrado!' });
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
        return res.status(400).json({ errors: 'Limite de usuários excedido!' });
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
      return res.status(500).json({ errors: 'Internal Sever Error' });
    }
  }

  async authenticateUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const userExists = await userRepository.findOneBy({ email });

      if (!userExists) {
        return res.status(400).json({ errors: 'Email ou senha inválidos!' });
      }

      const user = userExists;

      const verifyPassword = await bcrypt.compare(password, user.password);

      if (!verifyPassword) {
        return res.status(400).json({ errors: 'Email ou senha inválidos!' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
        expiresIn: '8h',
      });

      const { password: _, ...userLogin } = user;

      return res.json({
        user: userLogin,
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: 'Internal Server Error' });
    }
  }

  async getUser(req: Request, res: Response) {
    const user = req.user;
    return res.status(200).json(user);
  }

  async getProfiles(req: Request, res: Response) {
    try {
      const { idUser } = req.params;

      const findUser = await userRepository.findOneBy({
        id: Number(idUser),
      });

      if (!findUser) {
        return res.status(404).json({ errors: 'Usuário não encontrado!' });
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
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: 'Internal Server Error' });
    }
  }

  async deleteProfile(req: Request, res: Response) {
    try {
      const { profileId } = req.params;

      if (!(await profileRepository.findOneBy({ id: Number(profileId) }))) {
        return res.status(400).json({ errors: 'Perfil não encontrado' });
      }

      await profileRepository.delete(profileId);
      res.status(204).end();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: 'Internal Server Error' });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const { profileId } = req.params;
      const { profileName } = req.body;

      const profileUrlImage = req.app.locals.urlProfileS3;

      if (!profileUrlImage) {
        return res
          .status(400)
          .json({ errors: 'A imagem de perfil é obrigatória!' });
      }

      if (!(await profileRepository.findOneBy({ id: Number(profileId) }))) {
        return res.status(400).json({ errors: 'Perfil não encontrado' });
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updatedProfile = {
        profileName,
        profileUrlImage,
      };

      await profileRepository.update(profileId, updatedProfile);

      return res.status(201).json(updatedProfile);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: 'Internal Server Error' });
    }
  }
}
