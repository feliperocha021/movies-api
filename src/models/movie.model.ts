import { Document, model, Schema, Types } from "mongoose";
import { IGenreDocument } from "./genre.model";
import { IReviewDocument, reviewSchema } from "./review.model";

export interface IMovie {
  name: string;
  image: string;
  year: number;
  details: string;
  cast: string[];
  reviews: Types.DocumentArray<IReviewDocument>;
  numReviews: number;
  genre: Types.ObjectId | IGenreDocument;
}

export interface IMovieDocument extends IMovie, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const movieSchema = new Schema<IMovieDocument>(
  {
    name: { type: String, required: true },
    image: { type: String },
    year: { type: Number, required: true },
    details: { type: String, required: true },
    cast: [{ type: String }],
    reviews: [reviewSchema],
    numReviews: {type: Number, required: true, default: 0},
    genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
  },
  { timestamps: true }
);

export const Movie = model<IMovieDocument>("Movie", movieSchema);
