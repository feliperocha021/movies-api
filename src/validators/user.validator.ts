import z from "zod";

export const createUserSchema = z.object({
  username: z.string({ message: "Nome de usuário é obrigatório" }),
  email: z.email("E-mail inválido"),
  password: z.string({ message: "Senha é obrigatório" })
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
    .max(16, { message: "A senha deve ter no máximo 16 caracteres" })
    .refine(
      (val) =>
        /[A-Z]/.test(val) &&
        /[a-z]/.test(val) &&
        /[0-9]/.test(val) &&
        /[^A-Za-z0-9]/.test(val),
      {
        message:
          "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um símbolo",
      }
    ),
});
