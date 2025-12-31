import { Document, model, Schema, Types } from "mongoose";

export interface IGenre {
  name: string
}

export interface IGenreDocument extends IGenre, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const genreSchema = new Schema<IGenreDocument>(
  {
    name: { 
      type: String, 
      trim: true, 
      required: true, 
      maxLength: 32, 
      unique: true 
    }
  },
  {timestamps: true}
);

export const Genre = model<IGenreDocument>("Genre", genreSchema);
