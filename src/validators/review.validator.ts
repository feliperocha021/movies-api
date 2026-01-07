import z from "zod";
import { objectIdSchema } from "./objectId.validator.js";

export const createReviewSchema = z.object({
  rating: z.number({ error: "Rating is required" }).min(0).max(10),
  comment: z.string({ error: "Comment is required" }),
});
