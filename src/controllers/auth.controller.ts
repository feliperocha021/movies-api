import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";
import { cookieConfig } from "../config/cookie.js";
import { AccessTokenPayload, RefreshTokenPayload } from "../interfaces/user-payload.interface.js";
import { toUserDTO } from "../mappers/user.mapper.js";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      const { user, accessToken, refreshToken } = await this.authService.signup(username, email, password);

      res.cookie(cookieConfig.name, refreshToken, cookieConfig);
      res.setHeader("x-refresh-token", refreshToken);
      return res.status(201).json({ 
        success: true,
        message: "Usuário criado com sucesso",
        data: {
          user: toUserDTO(user),
          accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await this.authService.login(email, password);

      res.cookie(cookieConfig.name, refreshToken, cookieConfig);
      res.setHeader("x-refresh-token", refreshToken);
      return res.status(200).json({
        success: true,
        message: "Login realizado com sucesso",
        data: {
          user: toUserDTO(user),
          accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.user as RefreshTokenPayload;
      const { user, accessToken, refreshToken } = await this.authService.refresh(payload);

      res.cookie(cookieConfig.name, refreshToken, cookieConfig);
      res.setHeader("x-refresh-token", refreshToken);
      return res.status(200).json({
        success: true,
        message: "Token renovado com sucesso",
        data: {
          user: toUserDTO(user),
          accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.user as RefreshTokenPayload;

      await this.authService.logout(payload);

      res.clearCookie(cookieConfig.name, cookieConfig);

      return res.status(200).json({
        success: true,
        message: "Logout realizado com sucesso",
        data: null
      });
    } catch (err) {
      next(err);
    }
  }

  async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.user as AccessTokenPayload;

      await this.authService.logoutAll(payload);

      res.clearCookie(cookieConfig.name, cookieConfig);
      return res.status(200).json({
        success: true,
        message: "Logout global realizado com sucesso",
        data: null
      });
    } catch (err) {
      next(err);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as AccessTokenPayload).sub;
      const { currentPassword, newPassword } = req.body;
      const { user, accessToken, refreshToken } = await this.authService.changePassword(userId, currentPassword, newPassword);
      const formatedUser = toUserDTO(user);

      res.cookie(cookieConfig.name, refreshToken, cookieConfig);
      res.setHeader("x-refresh-token", refreshToken);

      return res.status(200).json({
        success: true,
        message: "Senha atualizada com suceso",
        data: {
          user: formatedUser,
          accessToken,
        }
      })
    } catch (err) {
      next(err);
    }
  }
}
