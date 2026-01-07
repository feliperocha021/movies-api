import z from "zod";
import { objectIdSchema } from "./objectId.validator.js";

export const updateReviewSchema = z.object({
  name: z.string().optional(),
  rating: z.number().min(0).max(10).optional(),
  comment: z.string().optional(),
  user: objectIdSchema,
});
