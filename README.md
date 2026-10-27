# API REST de Livros — Express + MongoDB

API REST para gerenciar um catálogo de livros, desenvolvida durante um curso de Node.js. Permite **listar, buscar, cadastrar, atualizar e remover** livros por meio de requisições HTTP.

> 🚧 **Projeto em desenvolvimento.** Por enquanto os livros ficam salvos apenas na memória; a integração com o MongoDB é a próxima etapa.

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/) — ambiente de execução JavaScript
- [Express](https://expressjs.com/) — framework para criar as rotas da API
- [Nodemon](https://nodemon.io/) — reinicia o servidor automaticamente a cada alteração no código
- MongoDB — banco de dados *(em breve)*

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior (já vem com o npm)
- [Git](https://git-scm.com/)
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

3. Instale as dependências (Express e Nodemon):

   ```bash
   npm install
   ```

## ▶️ Como executar

```bash
npm run dev
```

O servidor sobe em **http://localhost:3000** e mostra `servidor escutando` no terminal.

> 💡 Se o Nodemon não reiniciar sozinho depois de salvar um arquivo, digite `rs` no terminal e aperte Enter para reiniciar manualmente.

## 📚 Rotas da API

| Método   | Rota          | Descrição                  | Status de sucesso |
| -------- | ------------- | -------------------------- | ----------------- |
| `GET`    | `/`           | Mensagem de boas-vindas    | `200`             |
| `GET`    | `/livros`     | Lista todos os livros      | `200`             |
| `GET`    | `/livros/:id` | Busca um livro pelo id     | `200`             |
| `POST`   | `/livros`     | Cadastra um novo livro     | `201`             |
| `PUT`    | `/livros/:id` | Atualiza o nome de um livro | `200`            |
| `DELETE` | `/livros/:id` | Remove um livro            | `200`             |

### Exemplos

Nas requisições com corpo (`POST` e `PUT`), envie JSON com o cabeçalho `Content-Type: application/json`.

#### Listar livros

```http
GET /livros
```

Resposta:

```json
[
  { "id": 1, "nome": "Senhor dos Anéis" },
  { "id": 2, "nome": "O Hobbit" }
]
```

#### Buscar um livro

```http
GET /livros/1
```

Resposta:

```json
{ "id": 1, "nome": "Senhor dos Anéis" }
```

#### Cadastrar um livro

```http
POST /livros
Content-Type: application/json

{ "id": 3, "nome": "O Silmarillion" }
```

Resposta: `Livro adicionado com sucesso`

> O `id` não é gerado automaticamente: informe um que ainda não exista.

#### Atualizar um livro

```http
PUT /livros/1
Content-Type: application/json

{ "nome": "A Sociedade do Anel" }
```

Resposta: a lista completa de livros, já com a alteração.

#### Remover um livro

```http
DELETE /livros/2
```

Resposta: `Livro removido com sucesso`

## 📁 Estrutura do projeto

```
api-rest-express-mongo/
├── src/
│   └── app.js        # configuração do Express e definição das rotas
├── server.js         # ponto de entrada: sobe o servidor na porta 3000
├── package.json      # dependências e scripts
└── README.md
```

## ⚠️ Limitações conhecidas

- **Os dados não são persistidos.** Os livros ficam em uma lista na memória. Sempre que o servidor reinicia (inclusive quando o Nodemon reinicia após salvar um arquivo), a lista volta aos dois livros iniciais.
- **Não há validação de entrada.** O `POST` aceita qualquer corpo, sem conferir campos obrigatórios nem ids repetidos.
- **Ids inexistentes não são tratados.** Requisições para um id que não existe não retornam `404`:
  - `GET` responde `200` sem conteúdo;
  - `PUT` gera um erro `500`;
  - `DELETE` remove o **último livro da lista**.

## 🗺️ Próximos passos

- [ ] Conectar a API ao MongoDB
- [ ] Retornar `404` para livros não encontrados
- [ ] Validar os dados recebidos no `POST` e no `PUT`
- [ ] Gerar o `id` automaticamente
- [ ] Organizar o código em rotas, controllers e models

## 👤 Autor

**Guilherme Kenzo** — [@oguilhermekenzo](https://github.com/oguilhermekenzo)

## 📄 Licença

Este projeto está sob a licença ISC.
