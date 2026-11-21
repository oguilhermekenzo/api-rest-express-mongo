import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

const conexao = await conectaNaDatabase();

conexao.on("error", console.log.bind(console, "Erro de conexão"));
console.log("Conexão com o banco feita com sucesso");

const app = express();
routes(app);

app.use(manipuladorDeErros);

export default app;
