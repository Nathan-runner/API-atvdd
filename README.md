# Catálogo de Produtos e Categorias API

Uma API RESTful desenvolvida em Node.js para gerenciar um catálogo de produtos e categorias. A aplicação permite operações CRUD completas para ambas as entidades, com relacionamento um-para-muitos entre categorias e produtos.

##  Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para Node.js
- **Sequelize** - ORM para Node.js
- **MySQL** - Banco de dados relacional
- **dotenv** - Gerenciamento de variáveis de ambiente
- **CORS** - Middleware para habilitar CORS

##  Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- MySQL Server instalado e rodando

##  Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd catalogo-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=catalogo_db
DB_PORT=3306
PORT=3000
NODE_ENV=development
```

**Importante:** Certifique-se de que o banco de dados MySQL especificado em `DB_NAME` existe no seu servidor MySQL.

### 4. Execute as migrations

```bash
npx sequelize-cli db:migrate
```

Este comando irá criar as tabelas `categories` e `products` no banco de dados, incluindo a chave estrangeira que estabelece o relacionamento entre elas.

##  Executando a Aplicação

### Modo Desenvolvimento

```bash
npm run dev
```

O servidor será iniciado com nodemon, que reinicia automaticamente quando detecta mudanças no código.

### Modo Produção

```bash
npm start
```

##  Endpoints da API

### Categorias

- **POST** `/categories` - Criar uma nova categoria
- **GET** `/categories` - Listar todas as categorias
- **GET** `/categories/:id` - Buscar categoria por ID
- **PUT** `/categories/:id` - Atualizar categoria por ID
- **DELETE** `/categories/:id` - Deletar categoria por ID

### Produtos

- **POST** `/products` - Criar um novo produto
- **GET** `/products` - Listar todos os produtos
- **GET** `/products/:id` - Buscar produto por ID
- **PUT** `/products/:id` - Atualizar produto por ID
- **DELETE** `/products/:id` - Deletar produto por ID

##  Exemplos de Uso

### Criar uma Categoria

```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Eletrônicos"}'
```

### Criar um Produto

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smartphone",
    "description": "Smartphone Android 128GB",
    "price": 999.99,
    "categoryId": 1
  }'
```

### Listar Todos os Produtos com suas Categorias

```bash
curl -X GET http://localhost:3000/products
```

##  Estrutura do Banco de Dados

### Tabela: categories
- `id` (INT, PK, Auto Increment)
- `name` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tabela: products
- `id` (INT, PK, Auto Increment)
- `name` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL(10,2))
- `category_id` (INT, FK para categories.id)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

##  Funcionalidades

-  CRUD completo para Categorias e Produtos
-  Relacionamento 1:N entre Categorias e Produtos
-  Validações de dados
-  Middleware de logging de requisições
-  Tratamento de erros
-  Configuração via variáveis de ambiente
-  Migrations para versionamento do banco de dados

##  Logs

A aplicação inclui um middleware de log que registra no console todas as requisições recebidas, no formato:
```
[POST] /products
[GET] /categories
```

##  Solução de Problemas

### Erro de conexão com o MySQL
- Verifique se o MySQL está rodando
- Confirme as credenciais no arquivo `.env`
- Certifique-se de que o banco de dados existe

### Erro nas migrations
- Execute `npx sequelize-cli db:migrate:status` para verificar o status
- Use `npx sequelize-cli db:migrate:undo` para reverter a última migration se necessário

##  Licença

Este projeto é para fins educacionais.

---

**Desenvolvido como parte do curso de APIs RESTful**
