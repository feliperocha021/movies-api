import { Types } from "mongoose";
import { IReviewDocument } from "../../models/review.model.js";
import { IGenreDocument } from "../../models/genre.model.js";
import { ReviewDTO } from "./review.dto.js";

export interface MovieRequestDTO {
  name: string;
  image: string;
  year: number;
  details: string;
  cast: string[];
  reviews: ReviewDTO[];
  numReviews: number;
  genre: string;
}