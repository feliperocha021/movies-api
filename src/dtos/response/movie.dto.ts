import { ReviewDTO } from "./review.dto.js";

export interface MovieDTO {
  id: string;
  name: string;
  image: string;
  year: number;
  details: string;
  cast: string[];
  reviews: ReviewDTO[];
  numReviews: number;
  genre: string;
}