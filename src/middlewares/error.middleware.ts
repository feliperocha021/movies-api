import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || "Erro interno no servidor";

  if (err instanceof mongoose.Error.CastError) { 
    return res.status(400).json({ 
      success: false, 
      error: "ID inválido", 
      details: err.message, 
    }); 
  }

  res.status(status).json({
    success: false,
    error: message,
    details: err.errors || null,
  });
}
