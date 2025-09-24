const EventoService = require("../services/eventoService");

/**
 * Controlador responsável por lidar com requisições relacionadas aos eventos.
 */
class EventosController {
  /**
   * Trata o cadastro de um novo evento.
   * @async
   * @param {import("express").Request} req - Objeto da requisição HTTP, com `body` contendo os dados do evento.
   * @param {import("express").Response} res - Objeto da resposta HTTP.
   * @returns {Promise<import("express").Response>} Resposta HTTP com status 201 e dados do evento criado ou 409 em caso de erro.
   */
  static async register(req, res) {
    try {
      const result = await EventoService.createEvento(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  }

  /**
   * Consulta todos os eventos cadastrados.
   * @async
   * @param {import("express").Request} req - Objeto da requisição HTTP.
   * @param {import("express").Response} res - Objeto da resposta HTTP.
   * @returns {Promise<import("express").Response>} Resposta HTTP com status 200 e um objeto `{ eventos: Array<Object> }` ou 404/500 em caso de erro.
   */
  static async consultarEventos(req, res) {
    try {
      const result = await EventoService.buscarEventos(req.body);
      return res.status(200).json(result);
    } catch (error) {
      const status =
        error.message === "Não possui eventos cadastrados"
          ? 404
          : 500; 
      return res.status(status).json({ message: error.message });
    }
  }
}

module.exports = EventosController;
