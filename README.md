# Sistema de Gestão de Eventos

## Vídeo apresentação
https://drive.google.com/drive/folders/1ux9UgKTC_5JvytqPLbcF7a3IwY-1FqUw?usp=drive_link

## Descrição
Este projeto é um sistema de gestão de eventos desenvolvido como parte de um trabalho acadêmico. Ele possui integração entre **frontend** e **backend**, oferecendo funcionalidades de **login, logout, registro de usuários** e controle de permissões (roles).  

- Usuários com role `user` podem visualizar a lista de eventos cadastrados.  
- Usuários com role `admin` podem cadastrar novos eventos.  
- O registro de um usuário admin é feito automaticamente na primeira execução do projeto, se não existir um admin cadastrado.

## Funcionalidades
- Registro e login de usuários com autenticação.  
- Logout seguro.  
- Controle de roles (`user` e `admin`).  
- Listagem de eventos para usuários comuns.  
- Cadastro de eventos apenas para administradores.  
- Criação automática do usuário admin na primeira execução.

## Tecnologias Utilizadas
- **Frontend:** [React.js]
- **Backend:** [Node.js] 
- **Banco de dados:** MySQL
- **Autenticação:** JWT  

## Instalação

```bash
1. Clone o repositório:  
git clone https://github.com/ber0604/sistema-eventos.git

2. Criar banco de dados que está no arquivo database.sql

3. Configurar acesso banco de dados no arquivo .env

<<<<<<< Updated upstream
4. Criar dependências dentro das pastas /backend e /frontend:
npm install bcryptjs helmet cors dotenv react-router-dom axios express mysql2
=======
4. Criar dependências:
npm install bcryptjs helmet cors dotenv react-router-dom axios express mysql2 swagger-ui-express yamljs
>>>>>>> Stashed changes

5. Entrar na pasta /frontend e na /backend em diferentes terminais e rodar o comando:
npm run dev
```

## Testes
  Acessar arquivo backend/testes/api_test.rest





