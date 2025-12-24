import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export function validateBody(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        // passa os detalhes para o errorHandler
        next({
          status: 400,
          message: "Dados inválidos",
          errors: err.issues.map(e => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      } else {
        next(err);
      }
    }
  };
}
