import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { AccessTokenPayload, RefreshTokenPayload } from "../interfaces/user-payload.interface.js";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt-access", { session: false }, 
    (err: unknown, user: AccessTokenPayload | false) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Erro interno de autenticação",
          details: (err as Error).message,
        });
      }
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Não autorizado",
          details: "Token inválido ou expirado",
        });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export const requireAuthRefresh = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt-refresh", { session: false }, 
    (err: unknown, user: RefreshTokenPayload | false) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Erro interno de autenticação",
          details: (err as Error).message,
        });
      }
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Não autorizado",
          details: "Refresh token inválido ou expirado",
        });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};
