import z from "zod";

export const changePasswordUserSchema = z.object({
  currentPassword: z.string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(16, { message: "Password must be at most 16 characters long" })
    .refine(
      (val) =>
        /[A-Z]/.test(val) &&
        /[a-z]/.test(val) &&
        /[0-9]/.test(val) &&
        /[^A-Za-z0-9]/.test(val),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
      }
    ),
  newPassword: z.string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(16, { message: "Password must be at most 16 characters long" })
    .refine(
      (val) =>
        /[A-Z]/.test(val) &&
        /[a-z]/.test(val) &&
        /[0-9]/.test(val) &&
        /[^A-Za-z0-9]/.test(val),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
      }
    ),
  confirmPassword: z.string().nonempty({ message: "Confirm password is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});
