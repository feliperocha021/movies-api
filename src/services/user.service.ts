import bcrypt from "bcrypt";
import { ConflictError, NotFoundError } from "../errors/error.js";
import { User } from "../models/user.model.js";

export class UserService {
  async createUser(username: string, email: string, password: string) {
    const exist = await User.findOne({ email });
    if (exist) throw new ConflictError("Este e-mail já está em uso");

    const user = await User.create({ username, email, password });
    return user;
  }

  async getAllUsers() {
    return await User.find().sort({ createdAt: -1 });
  }

  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  async findById(userId: string) {
    const user = await User.findById(userId);
    if(!user) {
      throw new NotFoundError("Usuário não encontrado");
    }
    return user;
  }

  async updateUser(userId: string, username: string, email: string, password?: string) {
    const user = await this.findById(userId);

    const existEmail = await User.findOne({email: email})

    if (existEmail && existEmail.email !== user.email ) {
      throw new ConflictError("Este e-mail já está em uso");
    }

    user.username = username;
    user.email = email;

    await user.save();

    return user;
  }

  async updateUserRole(userId: string, role: "user" | "admin") {
    const user = await this.findById(userId);
    user.role = role;
    await user.save;

    return user;
  }

  async getMe(userId: string) {
    const user = await this.findById(userId);
    return user;
  }
}