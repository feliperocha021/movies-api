import z from "zod";
import { objectIdSchema } from "./objectId.validator";
import { createReviewSchema } from "./review.validator";

export const updateMovieSchema = z.object({
  name: z.string().min(1).optional(),
  image: z.string().url().optional(),
  year: z.number().int().optional(),
  details: z.string().min(1).optional(),
  cast: z.array(z.string().min(1)).optional(),
  reviews: z.array(createReviewSchema).optional(),
  numReviews: z.number().int().min(0).optional(),
  genre: objectIdSchema.optional(),
});
