import { Document, model, Schema, Types } from "mongoose";
import { IUserDocument } from "./user.model.js";

export interface IReview {
  name: string;
  rating: number;
  comment: string;
  user: Types.ObjectId | IUserDocument;
}

export interface IReviewDocument extends IReview, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const reviewSchema = new Schema<IReviewDocument>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

/* export const Review = model<IReviewDocument>("Review", reviewSchema); */
