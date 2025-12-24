import z from "zod";

export const updateUserSchema = z.object({
  username: z.string({ message: "Nome de usuário inválido" }),
  email: z.email("E-mail inválido")
});