import { Types } from "mongoose";
import { IReviewDocument } from "../../models/review.model";
import { IGenreDocument } from "../../models/genre.model";

export interface MovieDTO {
  id: string;
  name: string;
  image: string;
  year: number;
  details: string;
  cast: string[];
  reviews: IReviewDocument[];
  numReviews: number;
  genre: Types.ObjectId | IGenreDocument;
}