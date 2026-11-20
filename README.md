# API REST de Livros — Express + MongoDB

API REST para gerenciar um catálogo de **livros** e **autores**, desenvolvida durante um curso de Node.js. Os dados são salvos no **MongoDB** por meio do [Mongoose](https://mongoosejs.com/), e a API permite listar, buscar, cadastrar, atualizar e remover registros por meio de requisições HTTP.

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/) — ambiente de execução JavaScript (usando ES Modules)
- [Express](https://expressjs.com/) — framework para criar as rotas da API
- [MongoDB](https://www.mongodb.com/) — banco de dados NoSQL
- [Mongoose](https://mongoosejs.com/) — ODM que modela os dados e conversa com o MongoDB
- [dotenv](https://github.com/motdotla/dotenv) — carrega variáveis de ambiente a partir do arquivo `.env`
- [Nodemon](https://nodemon.io/) — reinicia o servidor automaticamente a cada alteração no código

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior (já vem com o npm)
- [Git](https://git-scm.com/)
- Um banco MongoDB, que pode ser:
  - **na nuvem**, com uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/atlas) (recomendado para quem está começando), ou
  - **local**, com o [MongoDB Community Server](https://www.mongodb.com/try/download/community) instalado na sua máquina
- Um cliente HTTP para testar as rotas, como [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/) ou `curl`

## 🚀 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/oguilhermekenzo/api-rest-express-mongo.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd api-rest-express-mongo
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure a conexão com o MongoDB (passo a passo na próxima seção).

## 🍃 Conectando ao MongoDB

A API lê o endereço do banco na variável de ambiente `DB_CONNECTION_STRING`. Você precisa criá-la em um arquivo `.env` na raiz do projeto antes de subir o servidor.

### Opção 1 — MongoDB Atlas (nuvem)

1. Crie uma conta gratuita em [mongodb.com/atlas](https://www.mongodb.com/atlas) e crie um **cluster** (o plano gratuito `M0` é suficiente).
2. Em **Database Access**, crie um usuário e uma senha para o banco.
   > Se a senha tiver caracteres especiais (`@`, `:`, `/`, `?`, `#`...), faça o [URL encoding](https://developer.mozilla.org/pt-BR/docs/Glossary/Percent-encoding) deles, senão a conexão falha. Por exemplo, `@` vira `%40`.
3. Em **Network Access**, libere o seu IP (**Add Current IP Address**). Sem isso o Atlas recusa a conexão.
4. No seu cluster, clique em **Connect → Drivers** e copie a *connection string*. Ela se parece com isto:

   ```notepad
   mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome-do-banco>?retryWrites=true&w=majority
   ```

5. Substitua `<usuario>`, `<senha>` e `<cluster>` pelos seus dados e coloque o nome do banco que quiser usar (por exemplo, `livraria`) logo depois da `/`. Se o banco ainda não existir, o MongoDB o cria automaticamente no primeiro registro salvo.

### Opção 2 — MongoDB local

Com o MongoDB Community Server instalado e rodando na porta padrão, a string de conexão é:

```notepad
mongodb://localhost:27017/livraria
```

### Criando o arquivo `.env`

Na raiz do projeto (ao lado do `package.json`), crie o arquivo `.env` com a sua string de conexão:

```env
DB_CONNECTION_STRING=mongodb+srv://usuario:senha@meu-cluster.mongodb.net/livraria?retryWrites=true&w=majority
```

> 🔒 **Nunca envie o `.env` para o GitHub.** Ele contém a senha do seu banco. Neste projeto ele já está listado no `.gitignore`, então o Git o ignora.

### Como o projeto usa essa conexão

1. O `server.js` importa `dotenv/config.js` logo na primeira linha, o que carrega o `.env` para `process.env`.
2. O arquivo [`src/config/dbConnect.js`](src/config/dbConnect.js) usa o Mongoose para conectar:

   ```js
   import mongoose from "mongoose";

   async function conectaNaDatabase() {
     await mongoose.connect(process.env.DB_CONNECTION_STRING);

     return mongoose.connection;
   }

   export default conectaNaDatabase;
   ```

3. O [`src/app.js`](src/app.js) chama essa função antes de montar as rotas, então a API só sobe depois de conectar ao banco:

   ```js
   const conexao = await conectaNaDatabase();

   conexao.on("error", console.log.bind(console, "Erro de conexão"));
   console.log("Conexão com o banco feita com sucesso");
   ```

### Problemas comuns

| Sintoma | Causa provável |
| ------- | -------------- |
| `The "uri" parameter to "openUri()" must be a string, got "undefined"` | O `.env` não existe, está fora da raiz do projeto ou a variável não se chama `DB_CONNECTION_STRING` |
| `bad auth: Authentication failed` | Usuário ou senha incorretos (ou senha com caracteres especiais sem URL encoding) |
| `Server selection timed out` / `ECONNREFUSED` | Seu IP não está liberado no Atlas, ou o MongoDB local não está rodando |
| `querySrv ENOTFOUND` | Endereço do cluster errado na string de conexão, ou sem acesso à internet |

## ▶️ Como executar

```bash
npm run dev
```

O servidor sobe em **http://localhost:3000**. Quando tudo dá certo, o terminal mostra:

```terminal 
Conexão com o banco feita com sucesso
servidor escutando
```

> 💡 Se o Nodemon não reiniciar sozinho depois de salvar um arquivo, digite `rs` no terminal e aperte Enter para reiniciar manualmente.

## 📚 Rotas da API

### Geral

| Método | Rota | Descrição               | Status de sucesso |
| ------ | ---- | ----------------------- | ----------------- |
| `GET`  | `/`  | Mensagem de boas-vindas | `200`             |

### Livros

| Método   | Rota                        | Descrição                         | Status de sucesso |
| -------- | --------------------------- | --------------------------------- | ----------------- |
| `GET`    | `/livros`                   | Lista todos os livros             | `200`             |
| `GET`    | `/livros/busca?editora=...` | Lista os livros de uma editora    | `200`             |
| `GET`    | `/livros/:id`               | Busca um livro pelo id            | `200`             |
| `POST`   | `/livros`                   | Cadastra um novo livro            | `201`             |
| `PUT`    | `/livros/:id`               | Atualiza um livro                 | `200`             |
| `DELETE` | `/livros/:id`               | Remove um livro                   | `200`             |

### Autores

| Método   | Rota            | Descrição                  | Status de sucesso |
| -------- | --------------- | -------------------------- | ----------------- |
| `GET`    | `/autores/:id`  | Busca um autor pelo id     | `200`             |
| `POST`   | `/autores`      | Cadastra um novo autor     | `201`             |
| `PUT`    | `/autores/:id`  | Atualiza um autor          | `200`             |
| `DELETE` | `/autores/:id`  | Remove um autor            | `200`             |

## 🧬 Modelos de dados

Os ids são gerados pelo MongoDB (`_id`, um `ObjectId` em formato de texto, como `"64f1c0a2b3d4e5f6a7b8c9d0"`). Você não precisa enviá-los.

**Autor** (coleção `autores`)

| Campo           | Tipo     | Obrigatório |
| --------------- | -------- | ----------- |
| `nome`          | `String` | ✅          |
| `nacionalidade` | `String` |             |

**Livro** (coleção `livro`)

| Campo     | Tipo     | Obrigatório | Observação                                              |
| --------- | -------- | ----------- | ------------------------------------------------------- |
| `titulo`  | `String` | ✅          |                                                         |
| `editora` | `String` |             |                                                         |
| `preco`   | `Number` |             |                                                         |
| `paginas` | `Number` |             |                                                         |
| `autor`   | `Autor`  |             | No cadastro, envie o **id** do autor (veja o exemplo)   |

Ao cadastrar um livro, a API busca o autor pelo id informado e **copia os dados dele para dentro do livro** (documento embutido). Por isso, alterar um autor depois não atualiza os livros que já foram cadastrados com ele.

## 🧪 Exemplos

Nas requisições com corpo (`POST` e `PUT`), envie JSON com o cabeçalho `Content-Type: application/json`.

### Cadastrar um autor

```http
POST /autores
Content-Type: application/json

{ "nome": "J. R. R. Tolkien", "nacionalidade": "Britânica" }
```

Resposta (`201`):

```json
{
  "message": "autor criado com sucesso",
  "autor": {
    "_id": "64f1c0a2b3d4e5f6a7b8c9d0",
    "nome": "J. R. R. Tolkien",
    "nacionalidade": "Britânica"
  }
}
```

Guarde o `_id` do autor: você vai usá-lo para cadastrar livros.

### Cadastrar um livro

```http
POST /livros
Content-Type: application/json

{
  "titulo": "O Hobbit",
  "editora": "HarperCollins",
  "preco": 49.9,
  "paginas": 336,
  "autor": "64f1c0a2b3d4e5f6a7b8c9d0"
}
```

Resposta (`201`):

```json
{
  "message": "criado com sucesso",
  "livro": {
    "_id": "64f1c1d7b3d4e5f6a7b8c9d1",
    "titulo": "O Hobbit",
    "editora": "HarperCollins",
    "preco": 49.9,
    "paginas": 336,
    "autor": {
      "_id": "64f1c0a2b3d4e5f6a7b8c9d0",
      "nome": "J. R. R. Tolkien",
      "nacionalidade": "Britânica"
    }
  }
}
```

### Listar livros

```http
GET /livros
```

Resposta: um array com todos os livros cadastrados.

### Buscar livros por editora

```http
GET /livros/busca?editora=HarperCollins
```

Resposta: um array com os livros daquela editora (a comparação é exata, incluindo maiúsculas e minúsculas).

### Buscar um livro pelo id

```http
GET /livros/64f1c1d7b3d4e5f6a7b8c9d1
```

### Atualizar um livro

```http
PUT /livros/64f1c1d7b3d4e5f6a7b8c9d1
Content-Type: application/json

{ "preco": 59.9 }
```

Resposta: `{ "message": "livro atualizado com sucesso" }`

### Remover um livro

```http
DELETE /livros/64f1c1d7b3d4e5f6a7b8c9d1
```

Resposta: `{ "message": "livro excluído com sucesso" }`

### Erros

Quando algo dá errado (id mal formatado, autor inexistente, campo obrigatório ausente etc.), a API responde `500` com uma mensagem:

```json
{ "message": "<detalhe do erro> - falha ao cadastrar livro" }
```

## 📁 Estrutura do projeto

```notepad
api-rest-express-mongo/
├── src/
│   ├── config/
│   │   └── dbConnect.js        # conexão com o MongoDB (Mongoose)
│   ├── controllers/
│   │   ├── autorController.js  # regras das rotas de autores
│   │   └── livroController.js  # regras das rotas de livros
│   ├── models/
│   │   ├── Autor.js            # schema e model de autores
│   │   └── Livro.js            # schema e model de livros
│   ├── routes/
│   │   ├── index.js            # registra todas as rotas no app
│   │   ├── autorRoutes.js      # rotas de /autores
│   │   └── livroRoutes.js      # rotas de /livros
│   └── app.js                  # conecta ao banco e configura o Express
├── server.js                   # ponto de entrada: carrega o .env e sobe o servidor na porta 3000
├── .env                        # variáveis de ambiente (não versionado)
├── package.json                # dependências e scripts
└── README.md
```

## 👤 Autor

**Guilherme Kenzo** — [@oguilhermekenzo](https://github.com/oguilhermekenzo)

## 📄 Licença

Este projeto está sob a licença ISC.
