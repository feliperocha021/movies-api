import z from "zod";
import { objectIdSchema } from "./objectId.validator.js";
import { createReviewSchema } from "./review.validator.js";

export const updateMovieSchema = z.object({
  name: z.string().min(1).optional(),
  image: z.string().refine(
    (val) =>
      /^https?:\/\/.+\.(png|jpg|jpeg|gif)$/i.test(val) ||
      val.startsWith("/") ||
      val.startsWith("./"),
    { message: "Invalid image path or URL" }
  ).optional(),
  year: z.number().int().optional(),
  details: z.string().min(1).optional(),
  cast: z.array(z.string().min(1)).optional(),
  reviews: z.array(createReviewSchema).optional(),
  numReviews: z.number().int().min(0).optional(),
  genre: objectIdSchema.optional(),
});
