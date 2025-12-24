import type { IUserDocument } from "../models/user.model";
import { UserDTO } from "../dtos/user.dto";

export function toUserDTO(user: IUserDocument): UserDTO {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
  };
}
