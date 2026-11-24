# 📚 API REST de Livros — Express + MongoDB

API REST para gerenciar um catálogo de **livros** e **autores**, desenvolvida durante um curso de Node.js. Os dados ficam no **MongoDB** (via [Mongoose](https://mongoosejs.com/)) e a API oferece CRUD completo, **busca com múltiplos filtros**, **paginação e ordenação**, **validações** e **tratamento de erros padronizado**.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/licen%C3%A7a-ISC-blue)

## 📑 Sumário

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#️-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Início rápido](#-início-rápido)
- [Conectando ao MongoDB](#-conectando-ao-mongodb)
- [Como executar](#️-como-executar)
- [Referência da API](#-referência-da-api)
  - [Paginação e ordenação](#paginação-e-ordenação)
  - [Busca de livros](#busca-de-livros)
- [Modelos de dados e validações](#-modelos-de-dados-e-validações)
- [Exemplos passo a passo](#-exemplos-passo-a-passo)
- [Tratamento de erros](#-tratamento-de-erros)
- [Testando com Postman ou curl](#-testando-com-postman-ou-curl)
- [Arquitetura e fluxo de uma requisição](#-arquitetura-e-fluxo-de-uma-requisição)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Scripts disponíveis](#-scripts-disponíveis)
- [Problemas comuns](#-problemas-comuns)
- [Limitações conhecidas e próximos passos](#-limitações-conhecidas-e-próximos-passos)
- [Autor](#-autor)
- [Licença](#-licença)

## ✨ Funcionalidades

- CRUD completo de **livros** e **autores**
- Livros vinculados a autores por **referência** (`ObjectId` + `populate`)
- **Busca com filtros combináveis**: editora, título (parcial, sem diferenciar maiúsculas), faixa de páginas e nome do autor
- **Paginação** (`limite`, `pagina`) e **ordenação** (`ordenacao=campo:1|-1`) nas listagens
- **Validações** de schema: campos obrigatórios, editoras permitidas, intervalo de páginas e bloqueio de strings vazias em qualquer campo de texto
- **Respostas de erro padronizadas** (`400`, `404`, `500`) por meio de middlewares e classes de erro próprias
- Código em **ES Modules** e organizado em camadas (rotas → controladores → modelos)

## 🛠️ Tecnologias

| Tecnologia | Para que serve |
| ---------- | -------------- |
| [Node.js](https://nodejs.org/) | Ambiente de execução JavaScript (ES Modules) |
| [Express](https://expressjs.com/) | Framework para criar as rotas e middlewares |
| [MongoDB](https://www.mongodb.com/) | Banco de dados NoSQL |
| [Mongoose](https://mongoosejs.com/) | ODM que modela os dados e conversa com o MongoDB |
| [dotenv](https://github.com/motdotla/dotenv) | Carrega variáveis de ambiente do arquivo `.env` |
| [Nodemon](https://nodemon.io/) | Reinicia o servidor a cada alteração no código |
| [ESLint](https://eslint.org/) | Análise estática e padronização do código |

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) **18 ou superior** (o npm já vem junto)
- [Git](https://git-scm.com/)
- Um banco MongoDB, que pode ser:
  - **na nuvem**: conta gratuita no [MongoDB Atlas](https://www.mongodb.com/atlas) (recomendado para quem está começando), ou
  - **local**: [MongoDB Community Server](https://www.mongodb.com/try/download/community) instalado na sua máquina
- Um cliente HTTP para testar: [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), a extensão REST Client do VS Code ou `curl`

Confira as versões instaladas:

```bash
node -v
npm -v
git --version
```

## 🚀 Início rápido

```bash
# 1. Clone o repositório
git clone https://github.com/oguilhermekenzo/api-rest-express-mongo.git

# 2. Entre na pasta
cd api-rest-express-mongo

# 3. Instale as dependências
npm install

# 4. Crie o .env a partir do modelo (Linux/macOS/Git Bash)
cp .env.exemple .env
#    No PowerShell: Copy-Item .env.exemple .env

# 5. Edite o .env e coloque a sua string de conexão do MongoDB
#    (veja a próxima seção)

# 6. Suba o servidor
npm run dev
```

Se aparecer `Conexão com o banco feita com sucesso` seguido de `servidor escutando`, abra **http://localhost:3000** no navegador. Você deve ver a mensagem `Curso de Node.js`.

## 🍃 Conectando ao MongoDB

A API lê o endereço do banco na variável de ambiente `DB_CONNECTION_STRING`, definida em um arquivo `.env` na raiz do projeto.

### Opção 1 — MongoDB Atlas (nuvem)

1. Crie uma conta gratuita em [mongodb.com/atlas](https://www.mongodb.com/atlas) e crie um **cluster** (o plano gratuito `M0` é suficiente).
2. Em **Database Access**, crie um usuário e uma senha para o banco.
   > Se a senha tiver caracteres especiais (`@`, `:`, `/`, `?`, `#`...), faça o [URL encoding](https://developer.mozilla.org/pt-BR/docs/Glossary/Percent-encoding) deles, senão a conexão falha. Por exemplo, `@` vira `%40`.
3. Em **Network Access**, libere o seu IP (**Add Current IP Address**). Sem isso o Atlas recusa a conexão.
4. No cluster, clique em **Connect → Drivers** e copie a *connection string*:

   ```text
   mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome-do-banco>?retryWrites=true&w=majority
   ```

5. Troque `<usuario>`, `<senha>` e `<cluster>` pelos seus dados e escreva o nome do banco (por exemplo, `livraria`) logo depois da `/`. Se o banco não existir, o MongoDB o cria no primeiro registro salvo.

### Opção 2 — MongoDB local

Com o MongoDB Community Server instalado e rodando na porta padrão (`27017`):

```text
mongodb://localhost:27017/livraria
```

### Criando o arquivo `.env`

Na raiz do projeto (ao lado do `package.json`), o arquivo `.env` deve ficar assim:

```env
DB_CONNECTION_STRING=mongodb+srv://usuario:senha@meu-cluster.mongodb.net/livraria?retryWrites=true&w=majority
```

> 🔒 **Nunca envie o `.env` para o GitHub.** Ele contém a senha do banco. Neste projeto ele já está no `.gitignore`. O arquivo `.env.exemple` é só um modelo, sem dados reais.

### Como o projeto usa essa conexão

1. O [`server.js`](server.js) importa `dotenv/config.js` na primeira linha, carregando o `.env` em `process.env`.
2. O [`src/config/dbConnect.js`](src/config/dbConnect.js) conecta com o Mongoose usando `process.env.DB_CONNECTION_STRING`.
3. O [`src/app.js`](src/app.js) aguarda essa conexão (`await`) antes de montar as rotas, então a API só sobe depois de conectar ao banco.

## ▶️ Como executar

```bash
npm run dev
```

O servidor sobe em **http://localhost:3000** (porta definida em [`server.js`](server.js)). No terminal:

```text
Conexão com o banco feita com sucesso
servidor escutando
```

> 💡 Se o Nodemon não reiniciar após salvar um arquivo, digite `rs` no terminal e aperte Enter.

## 📚 Referência da API

**URL base:** `http://localhost:3000`

Nas requisições com corpo (`POST` e `PUT`), envie JSON com o cabeçalho `Content-Type: application/json`.

### Geral

| Método | Rota | Descrição | Sucesso |
| ------ | ---- | --------- | ------- |
| `GET`  | `/`  | Mensagem de boas-vindas (`Curso de Node.js`) | `200` |

### Livros

| Método   | Rota                | Descrição                                      | Sucesso |
| -------- | ------------------- | ---------------------------------------------- | ------- |
| `GET`    | `/livros`           | Lista livros (com paginação e ordenação)       | `200`   |
| `GET`    | `/livros/busca`     | Busca livros por filtros (com paginação)       | `200`   |
| `GET`    | `/livros/:id`       | Busca um livro pelo id                         | `200`   |
| `POST`   | `/livros`           | Cadastra um livro                              | `201`   |
| `PUT`    | `/livros/:id`       | Atualiza um livro                              | `200`   |
| `DELETE` | `/livros/:id`       | Remove um livro                                | `200`   |

### Autores

| Método   | Rota            | Descrição                                   | Sucesso |
| -------- | --------------- | ------------------------------------------- | ------- |
| `GET`    | `/autores`      | Lista autores (com paginação e ordenação)   | `200`   |
| `GET`    | `/autores/:id`  | Busca um autor pelo id                      | `200`   |
| `POST`   | `/autores`      | Cadastra um autor                           | `201`   |
| `PUT`    | `/autores/:id`  | Atualiza um autor                           | `200`   |
| `DELETE` | `/autores/:id`  | Remove um autor                             | `200`   |

### Paginação e ordenação

As listagens (`GET /livros`, `GET /livros/busca` e `GET /autores`) aceitam estes parâmetros de query:

| Parâmetro   | Padrão   | Descrição |
| ----------- | -------- | --------- |
| `limite`    | `5`      | Quantidade de itens por página (inteiro maior que 0) |
| `pagina`    | `1`      | Número da página (inteiro maior que 0) |
| `ordenacao` | `_id:-1` | Formato `campo:ordem`. Use `1` para crescente e `-1` para decrescente |

```http
GET /livros?limite=10&pagina=2&ordenacao=titulo:1
GET /livros?ordenacao=preco:-1
GET /autores?limite=3
```

> `limite` ou `pagina` menores que 1 (ou não numéricos) resultam em `400`.

### Busca de livros

`GET /livros/busca` aceita os filtros abaixo, que podem ser **combinados** (todos precisam ser atendidos) e usados junto com a paginação:

| Parâmetro   | Tipo     | Comportamento |
| ----------- | -------- | ------------- |
| `editora`   | texto    | Igual à editora informada (comparação exata, diferencia maiúsculas) |
| `titulo`    | texto    | Contém o texto informado (parcial, **sem** diferenciar maiúsculas) |
| `minPag`    | número   | Livros com **pelo menos** essa quantidade de páginas |
| `maxPag`    | número   | Livros com **no máximo** essa quantidade de páginas |
| `nomeAutor` | texto    | Livros do autor com esse nome exato. Se nenhum autor for encontrado, retorna `[]` |

Os livros desta rota já vêm com o autor completo (`populate`).

```http
GET /livros/busca?editora=Editora 1
GET /livros/busca?titulo=hobbit
GET /livros/busca?minPag=100&maxPag=400
GET /livros/busca?nomeAutor=J. R. R. Tolkien&titulo=anéis&limite=10
```

## 🧬 Modelos de dados e validações

Os ids são gerados pelo MongoDB (`_id`, um `ObjectId` em texto como `"64f1c0a2b3d4e5f6a7b8c9d0"`). Você não precisa enviá-los.

### Autor (coleção `autores`)

| Campo           | Tipo     | Obrigatório | Regras |
| --------------- | -------- | ----------- | ------ |
| `nome`          | `String` | ✅ | Não pode ser vazio |
| `nacionalidade` | `String` |    | Se enviado, não pode ser vazio |

### Livro (coleção `livro`)

| Campo     | Tipo       | Obrigatório | Regras |
| --------- | ---------- | ----------- | ------ |
| `titulo`  | `String`   | ✅ | Não pode ser vazio |
| `editora` | `String`   | ✅ | Deve ser `Editora 1`, `Editora 2` ou `Editora 3` |
| `preco`   | `Number`   |    | |
| `paginas` | `Number`   |    | Entre **10** e **5000** |
| `autor`   | `ObjectId` | ✅ | Envie o **id** de um autor já cadastrado |

> **Validador global:** qualquer campo `String` dos modelos rejeita valores vazios ou só com espaços (veja [`validadorGlobal.js`](src/models/validadorGlobal.js)). A mensagem é `O campo '<campo>' não pode ser vazio`.

### Relação entre livro e autor

O livro guarda **apenas a referência** (`_id`) do autor. Na rota `/livros/busca` o Mongoose substitui essa referência pelos dados completos do autor (`populate`). Em `GET /livros` e `GET /livros/:id` o campo `autor` volta como o id.

## 🧪 Exemplos passo a passo

Siga a ordem: o livro precisa do `_id` de um autor existente.

### 1. Cadastrar um autor

```http
POST /autores
Content-Type: application/json

{ "nome": "J. R. R. Tolkien", "nacionalidade": "Britânica" }
```

Resposta `201`:

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

📌 Guarde o `_id` do autor.

### 2. Cadastrar um livro

```http
POST /livros
Content-Type: application/json

{
  "titulo": "O Hobbit",
  "editora": "Editora 1",
  "preco": 49.9,
  "paginas": 336,
  "autor": "64f1c0a2b3d4e5f6a7b8c9d0"
}
```

Resposta `201`:

```json
{
  "message": "criado com sucesso",
  "livro": {
    "_id": "64f1c1d7b3d4e5f6a7b8c9d1",
    "titulo": "O Hobbit",
    "editora": "Editora 1",
    "preco": 49.9,
    "paginas": 336,
    "autor": "64f1c0a2b3d4e5f6a7b8c9d0"
  }
}
```

### 3. Listar livros (paginado)

```http
GET /livros?limite=5&pagina=1&ordenacao=titulo:1
```

Resposta `200`: um array com até `limite` livros.

### 4. Buscar com filtros

```http
GET /livros/busca?nomeAutor=J. R. R. Tolkien&minPag=100
```

Resposta `200`, já com o autor populado:

```json
[
  {
    "_id": "64f1c1d7b3d4e5f6a7b8c9d1",
    "titulo": "O Hobbit",
    "editora": "Editora 1",
    "preco": 49.9,
    "paginas": 336,
    "autor": {
      "_id": "64f1c0a2b3d4e5f6a7b8c9d0",
      "nome": "J. R. R. Tolkien",
      "nacionalidade": "Britânica"
    }
  }
]
```

### 5. Buscar um livro pelo id

```http
GET /livros/64f1c1d7b3d4e5f6a7b8c9d1
```

### 6. Atualizar um livro

```http
PUT /livros/64f1c1d7b3d4e5f6a7b8c9d1
Content-Type: application/json

{ "preco": 59.9 }
```

Resposta `200`: `{ "message": "livro atualizado com sucesso" }`

### 7. Remover um livro

```http
DELETE /livros/64f1c1d7b3d4e5f6a7b8c9d1
```

Resposta `200`: `{ "message": "livro excluído com sucesso" }`

## 🚨 Tratamento de erros

Todos os erros passam pelos middlewares [`manipulador404`](src/middlewares/manipulador404.js) e [`manipuladorDeErros`](src/middlewares/manipuladorDeErros.js) e saem neste formato:

```json
{
  "mensagem": "Um ou mais dados estão incorretos",
  "status": 400
}
```

| Status | Quando acontece | Mensagem |
| ------ | --------------- | -------- |
| `400` | Id com formato inválido (`CastError`) ou `limite`/`pagina` inválidos | `Um ou mais dados estão incorretos` |
| `400` | Falha de validação do schema | `Houve um erro de validação de dados: <detalhes>` |
| `404` | Rota inexistente | `Página não encontrada` |
| `404` | Autor não encontrado (`GET`, `PUT`, `DELETE` em `/autores/:id`) | `Id do autor não localizado` |
| `500` | Qualquer erro inesperado | `Erro interno do servidor` |

Exemplo de erro de validação (`POST /livros` com editora inválida e páginas fora do limite):

```json
{
  "mensagem": "Houve um erro de validação de dados: A editora Outra deve ser uma das seguintes: Editora 1, Editora 2, Editora 3, O número de páginas deve estar entre 10 e 5000. Valor fornecido: 3",
  "status": 400
}
```

### Hierarquia das classes de erro

```text
Error
└── ErroBase               (500)  src/erros/erroBase.js
    ├── NaoEncontrado      (404)  src/erros/NaoEncontrado.js
    └── RequisicaoIncorreta (400) src/erros/RequisicaoIncorreta.js
        └── ErroValidacao  (400)  src/erros/ErroValidacao.js
```

## 🧰 Testando com Postman ou curl

### curl

```bash
# Criar autor
curl -X POST http://localhost:3000/autores \
  -H "Content-Type: application/json" \
  -d '{"nome":"J. R. R. Tolkien","nacionalidade":"Britânica"}'

# Criar livro (troque o id do autor)
curl -X POST http://localhost:3000/livros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"O Hobbit","editora":"Editora 1","preco":49.9,"paginas":336,"autor":"COLE_O_ID_DO_AUTOR"}'

# Listar com paginação
curl "http://localhost:3000/livros?limite=5&pagina=1"

# Buscar com filtros (aspas por causa do &)
curl "http://localhost:3000/livros/busca?titulo=hobbit&minPag=100"
```

### Postman

1. Crie uma *Collection* e uma variável `baseUrl` com o valor `http://localhost:3000`.
2. Nas requisições `POST`/`PUT`, vá em **Body → raw → JSON**.
3. Use `{{baseUrl}}/livros` como URL e, nos filtros e na paginação, adicione os parâmetros na aba **Params**.

## 🏗️ Arquitetura e fluxo de uma requisição

```text
Cliente
  │
  ▼
server.js ──► src/app.js ──► express.json()
                                  │
                                  ▼
                       routes (livroRoutes / autorRoutes)
                                  │
                                  ▼
                  controller  (monta a consulta do Mongoose)
                                  │
              ┌───────────────────┴───────────────────┐
              ▼ (listagens)                           ▼ (demais rotas)
   middleware paginar                          responde direto (res.json)
   (limite, página, ordenação)
              │
              ▼
          resposta JSON

  Qualquer erro  ──► next(err) ──► manipuladorDeErros ──► { mensagem, status }
  Rota inexistente ─► manipulador404 ──────────────────┘
```

Pontos importantes:

- Nas listagens, o controlador **não executa** a consulta: ele guarda a query em `req.resultado` e chama `next()`. Quem executa é o middleware [`paginar`](src/middlewares/paginar.js), aplicando `sort`, `skip` e `limit`.
- Os controladores usam `try/catch` e repassam os erros com `next(err)` para o manipulador central.
- [`src/models/index.js`](src/models/index.js) importa o validador global antes dos modelos, garantindo que a regra valha para todos eles.

## 📁 Estrutura do projeto

```text
api-rest-express-mongo/
├── src/
│   ├── config/
│   │   └── dbConnect.js          # conexão com o MongoDB (Mongoose)
│   ├── controllers/
│   │   ├── autorController.js    # lógica das rotas de autores
│   │   └── livroController.js    # lógica das rotas de livros e busca com filtros
│   ├── erros/
│   │   ├── erroBase.js           # erro base (500) e formato da resposta
│   │   ├── NaoEncontrado.js      # erro 404
│   │   ├── RequisicaoIncorreta.js# erro 400
│   │   └── ErroValidacao.js      # erro 400 com as mensagens de validação
│   ├── middlewares/
│   │   ├── manipulador404.js     # rota não encontrada
│   │   ├── manipuladorDeErros.js # tratamento central de erros
│   │   └── paginar.js            # paginação e ordenação
│   ├── models/
│   │   ├── Autor.js              # schema e model de autores
│   │   ├── Livro.js              # schema e model de livros
│   │   ├── validadorGlobal.js    # impede strings vazias em todos os modelos
│   │   └── index.js              # exporta os modelos
│   ├── routes/
│   │   ├── index.js              # registra as rotas no app
│   │   ├── autorRoutes.js        # rotas de /autores
│   │   └── livroRoutes.js        # rotas de /livros
│   └── app.js                    # conecta ao banco e configura o Express
├── server.js                     # ponto de entrada: carrega o .env e sobe o servidor
├── eslint.config.js              # regras do ESLint
├── .env.exemple                  # modelo do arquivo .env
├── .env                          # variáveis de ambiente (não versionado)
├── package.json                  # dependências e scripts
└── README.md
```

## 📜 Scripts disponíveis

| Comando | O que faz |
| ------- | --------- |
| `npm run dev` | Sobe o servidor com Nodemon (reinicia ao salvar) |
| `npm run lint` | Roda o ESLint e corrige o que for possível automaticamente |
| `npm test` | Ainda não há testes configurados |

## 🩺 Problemas comuns

| Sintoma | Causa provável | Solução |
| ------- | -------------- | ------- |
| `The "uri" parameter to "openUri()" must be a string, got "undefined"` | `.env` ausente, fora da raiz ou variável com nome errado | Crie o `.env` na raiz com `DB_CONNECTION_STRING=...` |
| `bad auth: Authentication failed` | Usuário/senha incorretos ou caracteres especiais sem URL encoding | Revise as credenciais e aplique URL encoding na senha |
| `Server selection timed out` / `ECONNREFUSED` | IP não liberado no Atlas ou MongoDB local parado | Libere o IP em **Network Access** ou inicie o serviço do MongoDB |
| `querySrv ENOTFOUND` | Endereço do cluster errado ou sem internet | Copie novamente a connection string no Atlas |
| `EADDRINUSE: address already in use :::3000` | Outra aplicação usando a porta 3000 | Encerre o processo ou altere `PORT` em `server.js` |
| `400` ao buscar/atualizar por id | Id com formato inválido | Use um `_id` de 24 caracteres hexadecimais |
| `500` ao cadastrar livro | Autor informado não existe | Cadastre o autor antes e use o `_id` correto |
| `400` com "editora ... deve ser uma das seguintes" | Editora fora da lista permitida | Use `Editora 1`, `Editora 2` ou `Editora 3` |

## 🔭 Limitações conhecidas e próximos passos

Pontos que valem melhoria futura:

- [ ] `GET /livros/:id`, `PUT` e `DELETE` de livros não retornam `404` quando o id não existe (diferente de autores)
- [ ] `POST /livros` com id de autor inexistente retorna `500` genérico em vez de `404`
- [ ] A porta (`3000`) está fixa em `server.js`; ler de `process.env.PORT`
- [ ] `GET /livros` não popula o autor (apenas `/livros/busca`)
- [ ] Lista de editoras fixa no schema; poderia virar uma coleção própria
- [ ] Adicionar testes automatizados (Jest/Supertest)
- [ ] Adicionar documentação interativa com Swagger/OpenAPI
- [ ] Adicionar autenticação (JWT) e CORS

## 👤 Autor

**Guilherme Kenzo** — [@oguilhermekenzo](https://github.com/oguilhermekenzo)

## 📄 Licença

Este projeto está sob a licença ISC.
