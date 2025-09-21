const db = require("../config/database");

class UserModel {
  static async findAll() {
    const [rows] = await db.query("SELECT * FROM usuario");
    return rows;
  }

  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM usuario WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async create(user) {
    console.log(user);
    
    const { email, senha, role } = user;
    const [result] = await db.query(
      "INSERT INTO usuario (email, senha, role) VALUES (?, ?, ?)",
      [email, senha, role]
    );
    return result.insertId; // Retorna o ID do usuário criado
  }
}

module.exports = UserModel;
