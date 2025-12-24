import z from "zod";

export const updateRoleSchema = z.object({
  role: z.enum(["user", "admin", "superadmin"], { message: "Role inválida" })
});
