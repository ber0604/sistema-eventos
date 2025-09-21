const db = require("../config/database");

class EventoModel {

  static async findAll() {
    const [rows] = await db.query("SELECT * FROM evento;");
    return rows;
  }

  static async create(evento) {
    const { titulo, data_evento, criado_em } = evento;
    const [result] = await db.query(
      "INSERT INTO evento (titulo, data_evento, criado_em) VALUES (?, ?, ?)",
      [titulo, data_evento, criado_em]
    );
    return result.insertId; // Retorna o ID do usuário criado
  }
}

module.exports = EventoModel;