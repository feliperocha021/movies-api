import z from "zod";
import { createReviewSchema } from "./review.validator";
import { objectIdSchema } from "./objectId.validator";

export const createMovieSchema = z.object({
  name: z.string({ error: "Name is required" }),
  image: z.string().refine(
    (val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    },
    { error: "Invalid URL" }
  ).optional(),
  year: z.number().int({ error: "Year must be an integer" }),
  details: z.string("Details are required"),
  cast: z.array(z.string().nonempty("Cast must have at one member")),
  reviews: z.array(createReviewSchema).optional(),
  numReviews: z.number().int().min(0).default(0),
  genre: objectIdSchema,
});
