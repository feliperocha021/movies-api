import { ReviewDTO } from "../dtos/response/review.dto.js";
import { IReviewDocument } from "../models/review.model.js";

export function toReviewDTO(review: IReviewDocument): ReviewDTO {
  return { 
    id: review._id.toString(), 
    name: review.name, 
    rating: review.rating, 
    comment: review.comment, 
    user: review.user.toString(),
    createdAt: review.createdAt.toISOString(), 
    updatedAt: review.updatedAt.toISOString(), 
  };
}