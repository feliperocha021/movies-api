import z from "zod";
import { createReviewSchema } from "./review.validator.js";
import { objectIdSchema } from "./objectId.validator.js";

export const createMovieSchema = z.object({
  name: z.string({ error: "Name is required" }),
  image: z.string().refine(
    (val) =>
      /^https?:\/\/.+\.(png|jpg|jpeg|gif)$/i.test(val) ||
      val.startsWith("/") ||
      val.startsWith("./"),
    { message: "Invalid image path or URL" }
  ).optional(),
  year: z.number().int({ error: "Year must be an integer" }),
  details: z.string("Details are required"),
  cast: z.array(z.string().nonempty("Cast must have at one member")),
  reviews: z.array(createReviewSchema).optional(),
  numReviews: z.number().int().min(0).default(0),
  genre: objectIdSchema,
});
