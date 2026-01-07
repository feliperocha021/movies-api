import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import { toUserDTO } from "../mappers/user.mapper.js";
import { AccessTokenPayload } from "../interfaces/user-payload.interface.js";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      const formatedUsers = users.map((user) => toUserDTO(user));
      return res.status(200).json({
        success: true,
        message: "Usuários encontrados com sucesso",
        data: {
          users: formatedUsers
        }
      });
    } catch (err) {
      next(err);
    }
  }

  async getUserByID(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);
      const formatedUser = toUserDTO(user);

      return res.status(200).json({
        success: true,
        message: "Usuário encontrado com sucesso",
        data: { user: formatedUser }
      })
    } catch (err) {
      next(err);
    }
  }

  async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as AccessTokenPayload).sub;

      const { username, email } = req.body;
      
      const updatedUser = await this.userService.updateUser(userId, username, email);
      const formatedUser = toUserDTO(updatedUser);

      return res.status(200).json({
        success: true,
        message: "Usuário atualizado com sucesso",
        data: { user: formatedUser }
      });
    } catch (err) {
      next(err);
    }
  }

  async updateUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const { role } = req.body;

      const updatedUser = await this.userService.updateUserRole(userId, role);
      
      const formatedUser = toUserDTO(updatedUser);

      return res.status(200).json({
        success: true,
        message: "Role do usuário atualizada",
        data: { 
          user: formatedUser 
        }
      });
    } catch (err) {
      next(err);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as AccessTokenPayload).sub;
      const user = await this.userService.getMe(userId);

      const formatedUser = toUserDTO(user);

      return res.status(200).json({
        success: true,
        message: "Usuário encontrado",
        data: {
          user: formatedUser
        }
      });
    } catch (err) {
      next(err);
    }
  }
}