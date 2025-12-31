import z from "zod";

export const genreSchema = z.object({
  name: z.string("Nome é obrigatório"),
});
