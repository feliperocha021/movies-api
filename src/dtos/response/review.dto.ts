import { Types } from "mongoose";
import { IUserDocument } from "../../models/user.model.js";

export interface ReviewDTO { 
  id: string;
  name: string;
  rating: number;
  comment: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}