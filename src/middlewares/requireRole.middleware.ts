import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/user.model";

export const requireRole = (roles: Array<"user" | "admin" | "superadmin">) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser | undefined;
    if(!user) {
      return res.status(401).json({
        success: false,
        error: "Não autorizado",
        details: "Usuário não autenticado",
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        error: "Acesso negado",
        details: "Usuário não possui privilégios de administrador",
      });
    }

    next();
  }
};