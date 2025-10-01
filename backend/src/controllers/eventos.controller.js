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
   * Trata a exclusão de um evento existente.
   * @async
   * @param {import("express").Request} req - Objeto da requisição HTTP, com `params.id` contendo o ID do evento.
   * @param {import("express").Response} res - Objeto da resposta HTTP.
   * @returns {Promise<import("express").Response>} Resposta HTTP com status 200 se excluído, 404 se não encontrado, ou 500 em caso de erro.
   */
  static async excluirEvento(req, res) {
    try {
      const { id } = req.params;

      const deleted = await EventoService.deleteEvento(id);

      if (!deleted) {
        return res.status(404).json({ message: "Evento não encontrado" });
      }

      return res.status(200).json({ message: "Evento excluído com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao excluir evento" });
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
