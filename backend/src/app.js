const express = require('express');
// Importa o framework Express, utilizado para criar o servidor HTTP e
const cors = require('cors');
// Importa o middleware que permite o compartilhamento de recursos entre
const helmet = require('helmet');
// Importa o middleware de segurança que adiciona cabeçalhos HTTP para proteger
const userRoutes = require('./routes/userRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const voluntarioRoutes = require('./routes/voluntarioRoutes');
// Importa as rotas relacionadas aos usuários

const loggerMiddleware = require('./middlewares/log.middleware');
const errorMiddleware = require('./middlewares/errorMiddleware');
// Importa o middleware para tratamento centralizado de erros
const app = express();
// Cria uma instância do aplicativo Express
// Middlewares globais
app.use(cors());
// Habilita o CORS em todas as rotas da aplicação
app.use(helmet());
// Adiciona proteção au
app.use(express.json());
// Permite que o servidor interprete requisições com corpo em formato JSON
// Rotas da aplicação
app.use('/users', userRoutes);
app.use('/eventos', eventoRoutes);
app.use('/voluntarios', voluntarioRoutes);
// Define que todas as requisições iniciadas com /users serão encaminhadas para
// Middleware de tratamento de erros (deve ser adicionado depois das rotas)
app.use(errorMiddleware);
app.use(loggerMiddleware);
    
// Middleware que captura e trata erros, enviando respostas ao cliente
module.exports = app;
