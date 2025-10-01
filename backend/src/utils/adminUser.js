const bcrypt = require("bcryptjs"); 
const UserModel = require("../models/userModel.js");

async function createAdminIfNotExists() {
  const nome = "Administrador";
  const telefone = "549999999999";
  const email = "admin@ifrs.com";
  const senha = "123";
  const role = "admin";

  const existingAdmin = await UserModel.findByRole(role);

  if (!existingAdmin) {
    const hashed = await bcrypt.hash(senha, 10);
    await UserModel.create({ nome, telefone, email, senha: hashed, role });
    console.log("✅ Usuário admin criado!");
  } else {
    console.log("ℹ️ Admin já existe.");
  }
}

module.exports = createAdminIfNotExists;