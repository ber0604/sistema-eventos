require("dotenv").config(); // Carrega variáveis de ambiente
const app = require("./src/app");
const createAdminIfNotExists = require("./src/utils/adminUser.js");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// Cria admin se não existir
createAdminIfNotExists();

// Carrega o arquivo Swagger
const swaggerDocument = YAML.load("./swagger.yaml");

// Rota para documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});