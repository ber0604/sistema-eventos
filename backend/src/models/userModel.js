const db = require("../config/database");

/**
 * Classe responsável por interagir com a tabela de usuários no banco de dados.
 */
class UserModel {
  /**
   * Retorna todos os usuários cadastrados no banco de dados.
   * @async
   * @returns {Promise<Array<Object>>} Uma lista de objetos representando os usuários.
   */
  static async findAll() {
    const [rows] = await db.query("SELECT * FROM usuario");
    return rows;
  }

  /**
   * Busca um usuário pelo e-mail.
   * @async
   * @param {string} email - E-mail do usuário.
   * @returns {Promise<Object|null>} Objeto do usuário encontrado ou null se não existir.
   */
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM usuario WHERE email = ?", [
      email,
    ]);
    return rows[0] || null;
  }

  /**
   * Busca um usuário pelo role.
   * @async
   * @param {string} role - Role do usuário (ex: 'user', 'admin').
   * @returns {Promise<Object|null>} Objeto do usuário encontrado ou null se não existir.
   */
  static async findByRole(role) {
    const [rows] = await db.query("SELECT * FROM usuario WHERE role = ?", [
      role,
    ]);
    return rows[0] || null;
  }

  /**
   * Cria um novo usuário no banco de dados.
   * @async
   * @param {Object} user - Dados do usuário a ser criado.
   * @param {string} user.email - E-mail do usuário.
   * @param {string} user.senha - Senha do usuário (deve estar hashada).
   * @param {string} user.role - Role do usuário (ex: 'user', 'admin').
   * @returns {Promise<number>} ID do usuário criado.
   */
  static async create(user) {
    const { email, senha, role } = user;
    const [result] = await db.query(
      "INSERT INTO usuario (email, senha, role) VALUES (?, ?, ?)",
      [email, senha, role]
    );
    return result.insertId; // Retorna o ID do usuário criado
  }
}

module.exports = UserModel;