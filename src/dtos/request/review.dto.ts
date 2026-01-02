import { Types } from "mongoose";
import { IUserDocument } from "../../models/user.model";

export interface ReviewDTO {
  id: string;
  name: string;
  rating: number;
  comment: string;
  user: Types.ObjectId | IUserDocument;
}