import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.validation.js";

(async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);

    // verifica se já existe superadmin
    const exist = await User.findOne({ role: "superadmin" });
    if (exist) {
      console.log("Já existe um superadmin cadastrado.");
      process.exit(0);
    }

    // gera hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ENV.SUPERADMIN_PASSWORD, salt);

    // cria superadmin
    await User.create({
      username: ENV.SUPERADMIN_USERNAME,
      email: ENV.SUPERADMIN_EMAIL,
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("Superadmin criado com sucesso!");
    process.exit(0);
  } catch (err) {
    console.error("Erro ao criar superadmin:", err);
    process.exit(1);
  }
})();
