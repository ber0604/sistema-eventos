// Importa o serviço de usuário que contém a lógica de negócio para registro e login
const EventoService = require("../services/eventoService");
// Classe responsável por lidar com as requisições de autenticação (registro e login)
class EventosController {
  // Método estático que trata o cadastro de um novo usuário
  static async register(req, res) {
    try {
      console.log('registrando');
      
      // Chama o serviço para registrar o usuário, passando os dados da requisição
      const result = await EventoService.createEvento(req.body);
      // Retorna status 201 (Criado) com os dados retornados pelo serviço
      return res.status(201).json(result);
    } catch (error) {
      // Em caso de erro (ex: usuário já existe), retorna status 409 (Conflito) com a mensagem do erro
      return res.status(409).json({ message: error.message });
    }
  }
  // Método estático que trata o login do usuário
  static async consultarEventos(req, res) {
    try {
      // Chama o serviço para autenticar o usuário, passando os dados da requisição
      const result = await EventoService.buscarEventos(req.body);
      // Retorna status 200 (OK) com o token JWT
      return res.status(200).json(result); // envia { token, user }
    } catch (error) {
      // Define o status apropriado com base na mensagem de erro
      const status =
        error.message === "Não possui eventos cadastrados"
          ? 404
          : 500; 
      return res.status(status).json({ message: error.message });
    }
  }
}

module.exports = EventosController;