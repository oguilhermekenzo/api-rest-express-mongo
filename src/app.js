import express from "express";

const app = express();
app.use(express.json());

const livros = [
  {
    id: 1,
    nome: "Senhor dos Anéis",
  },

  {
    id: 2,
    nome: "O Hobbit",
  },
];

function getLivroById(id) {
  return livros.findIndex((livro) => {
    return livro.id === Number(id);
  });
}

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node.js");
});

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro adicionado com sucesso");
});

app.get("/livros/:id", (req, res) => {
  const index = getLivroById(req.params.id);
  res.status(200).json(livros[index]);
});

app.put("/livros/:id", (req, res) => {
  const index = getLivroById(req.params.id);
  livros[index].nome = req.body.nome;
  res.status(200).json(livros);
});

export default app;
 