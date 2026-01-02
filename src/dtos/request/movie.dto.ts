import { Types } from "mongoose";
import { IReviewDocument } from "../../models/review.model";
import { IGenreDocument } from "../../models/genre.model";
import { ReviewDTO } from "./review.dto";

export interface MovieRequestDTO {
  name: string;
  image: string;
  year: number;
  details: string;
  cast: string[];
  reviews: ReviewDTO[];
  numReviews: number;
  genre: Types.ObjectId | IGenreDocument;
}