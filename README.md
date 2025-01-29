# Projeto de Gerenciamento de Pessoas

Este projeto consiste em uma aplicação full-stack para gerenciamento de pessoas, com um frontend em React e um backend em Fastify, utilizando Prisma como ORM para interagir com o banco de dados.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **Frontend**: Uma aplicação React que consome a API do backend para listar, adicionar, editar e deletar pessoas.
- **Backend**: Uma API RESTful construída com Node e Fastify que gerencia as operações CRUD para a entidade `Person`.
- **Banco de Dados**: O banco de dados deste projeto foi configurado no Amazon RDS (Relational Database Service) utilizando PostgreSQL como engine.

## Tecnologias Utilizadas

### **Frontend**:
- Next.js
- React
- Axios (para requisições HTTP)
- Lucide React (para ícones)
- Tailwind CSS (para estilização)

### **Backend**:
- Fastify (framework web)
- Prisma (ORM para banco de dados)
- Amazon RDS (PostgreSQL)

## Como Executar o Projeto

### **Pré-requisitos**

- Node.js (v18 ou superior)
- npm ou yarn

### **Passos para Execução**

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/Isaell-Kelson/Yolo.git
   cd Yolo
   ```

2. **Instale as dependências**:

   No diretório do backend:

   ```bash
   cd yolo-backend
   npm install
   ```

   No diretório do frontend:

   ```bash
   cd yolo-web
   npm install
   ```

3. **Configuração do Banco de Dados**:

   Certifique-se de que o banco de dados está configurado corretamente no arquivo `prisma/schema.prisma`.

   Execute as migrações do Prisma:

   ```bash
   cd yolo-backend
   npx prisma migrate dev --name init
   ```

4. **Popule o banco de dados com dados iniciais**:

   Execute o script de seed:

   ```bash
   cd yolo-backend
   npm run seed
   ```

5. **Inicie o servidor backend**:

   ```bash
   cd yolo-backend
   npm run dev
   ```
   O backend estará exposto em `http://localhost:3001`.

6. **Inicie o servidor frontend**:

   ```bash
   cd yolo-web
   npm run dev
   ```
   O frontend estará exposto em `http://localhost:3000`.

## **Endpoints da API**

- `GET /`: Retorna todas as pessoas.
- `GET /:type`: Retorna pessoas filtradas por tipo.
- `POST /`: Adiciona uma nova pessoa.
- `PUT /:id`: Atualiza os dados de uma pessoa existente.
- `DELETE /:id`: Remove uma pessoa.

## **Funcionalidades do Frontend**

- **Listagem de Pessoas**: Exibe todas as pessoas cadastradas.
- **Adicionar Pessoa**: Permite adicionar uma nova pessoa ao sistema.
- **Editar Pessoa**: Permite editar os dados de uma pessoa existente.
- **Filtrar Pessoas**: Filtra as pessoas por tipo (Hóspede, Proprietário, Fornecedor ou Operador).
- **Deletar Pessoa**: Remove uma pessoa do sistema.

