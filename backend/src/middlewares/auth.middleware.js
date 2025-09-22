const jwt = require("jsonwebtoken");
// Importa a biblioteca JWT para verificar e decodificar tokens de autenticação
// Middleware para autenticar o token JWT enviado pelo cliente
function authenticateToken(req, res, next) {
  // Recupera o cabeçalho de autorização da requisição
  const authHeader = req.headers["authorization"];
  // Extrai o token do cabeçalho no formato "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];
  // Se não houver token, responde com status 401 (Não autorizado)
  if (!token) return res.sendStatus(401);
  // Verifica e valida o token usando a chave secreta definida no .env
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido: acesso proibido
    // Se o token for válido, adiciona os dados do usuário decodificados na
    req.user = user;
    // Passa para o próximo middleware ou rota
    console.log('autenticado');
    
    next();
  });
}

function authorizeRole(role) {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ message: "Acesso negado" });
      }
      next();
  };
}

module.exports = { authenticateToken, authorizeRole };