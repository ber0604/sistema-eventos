const EventoModel = require("../models/eventoModel");

class EventoService {

  static async createEvento(user) {
    const { email, senha } = user;
    user.role = "user";
    const id = await EventoModel.create(user);
    return { message: "Evento registrado com sucesso", id };
  }

  static async buscarEventos() {
    // Busca o usuário pelo e-mail
    const user = await EventoModel.findByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    // Verifica se a senha fornecida é válida
    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) {
      throw new Error("Senha inválida");
    }
    // Gera o token JWT
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Retorna o token e o usuário para o controller
    return { token, user: { email: user.email, role: user.role } };
  }
}

module.exports = EventoService;