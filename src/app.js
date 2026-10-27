import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import livro from "./Livro.js";

const conexao = await conectaNaDatabase();

conexao.on("error", console.log.bind(console, "Erro de conexão"));
console.log("Conexão com o banco feita com sucesso");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node.js");
});

app.get("/livro", async (req, res) => {
  const listaLivros = await livro.find();
  res.status(200).json(listaLivros);
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

app.delete("/livros/:id", (req, res) => {
  const index = getLivroById(req.params.id);
  livros.splice(index, 1);
  res.status(200).send("Livro removido com sucesso");
});

export default app;
