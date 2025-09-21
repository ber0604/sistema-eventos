require("dotenv").config(); // Carrega variáveis de ambiente
const app = require("./src/app");
const createAdminIfNotExists = require("./src/utils/adminUser.js");
createAdminIfNotExists();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
