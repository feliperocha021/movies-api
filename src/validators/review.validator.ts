import z from "zod";
import { objectIdSchema } from "./objectId.validator";

export const createReviewSchema = z.object({
  name: z.string({ error: "Name is required" }),
  rating: z.number({ error: "Rating is required" }).min(0).max(10),
  comment: z.string({ error: "Comment is required" }),
  user: objectIdSchema,
});
