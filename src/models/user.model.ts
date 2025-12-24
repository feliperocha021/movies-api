import { Document, Schema, Types, model } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin" | "superadmin";
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "superadmin"], default: "user" },
  },
  { timestamps: true }
);

export const User = model<IUserDocument>("User", userSchema);
