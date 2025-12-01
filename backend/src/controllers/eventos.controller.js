const EventoService = require("../services/eventoService");
const logger = require("../config/logger"); // Winston

class EventosController {

  /**
   * Cadastro de evento
   */
  static async register(req, res) {
    logger.info("Requisição recebida: POST /eventos", {
      ip: req.ip,
      body: req.body
    });

    try {
      const result = await EventoService.createEvento(req.body);

      logger.info("Evento criado com sucesso", {
        id: result.id,
        titulo: req.body.titulo
      });

      return res.status(201).json(result);
    } catch (error) {
      logger.error("Erro ao criar evento", {
        error: error.message,
        body: req.body
      });

      return res.status(409).json({ message: error.message });
    }
  }

  /**
   * Exclusão de evento
   */
  static async excluirEvento(req, res) {
    const { id } = req.params;

    logger.info("Requisição recebida: DELETE /eventos/:id", {
      id,
      ip: req.ip
    });

    try {
      const deleted = await EventoService.deleteEvento(id);

      if (!deleted) {
        logger.warn("Tentativa de excluir evento inexistente", { id });

        return res.status(404).json({ message: "Evento não encontrado" });
      }

      logger.info("Evento excluído com sucesso", { id });

      return res.status(200).json({ message: "Evento excluído com sucesso" });
    } catch (error) {
      logger.error("Erro ao excluir evento", {
        id,
        error: error.message
      });

      return res.status(500).json({ message: "Erro ao excluir evento" });
    }
  }

  /**
   * Consulta de eventos
   */
  static async consultarEventos(req, res) {
    logger.info("Requisição recebida: GET /eventos", {
      ip: req.ip
    });

    try {
      const result = await EventoService.buscarEventos();

      logger.info("Eventos consultados com sucesso", {
        total: result.eventos.length
      });

      return res.status(200).json(result);
    } catch (error) {
      const status =
        error.message === "Não possui eventos cadastrados" ? 404 : 500;

      logger.error("Erro ao consultar eventos", {
        status,
        error: error.message
      });

      return res.status(status).json({ message: error.message });
    }
  }
}

module.exports = EventosController;