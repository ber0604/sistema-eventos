const db = require("../config/database");

/**
 * Classe responsável por interagir com a tabela de eventos no banco de dados.
 */
class EventoModel {
  /**
   * Busca todos os eventos cadastrados no banco de dados.
   * @async
   * @returns {Promise<Array<Object>>} Uma lista de objetos representando os eventos.
   */
  static async findAll() {
    const [rows] = await db.query("SELECT * FROM evento;");
    return rows;
  }

  /**
   * Cria um novo evento no banco de dados.
   * @async
   * @param {Object} evento - Dados do evento a ser criado.
   * @param {string} evento.titulo - Título do evento.
   * @param {string} evento.data_evento - Data do evento (formato YYYY-MM-DD).
   * @param {string} evento.criado_em - Data/hora de criação do evento.
   * @returns {Promise<number>} ID do evento criado.
   */
  static async create(evento) {
    const { titulo, data_evento, criado_em } = evento;
    const [result] = await db.query(
      "INSERT INTO evento (titulo, data_evento, criado_em) VALUES (?, ?, ?)",
      [titulo, data_evento, criado_em]
    );
    return result.insertId; // Retorna o ID do evento criado
  }
}

module.exports = EventoModel;