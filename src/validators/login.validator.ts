import z from "zod";

export const loginUserSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string({ message: "Senha é obrigatório" }),
});
