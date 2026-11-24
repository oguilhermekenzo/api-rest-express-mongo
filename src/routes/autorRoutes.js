import express from "express";
import autorController from "../controllers/autorController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/", autorController.listarAutores);
routes.get("/autores", autorController.listarAutores, paginar);
routes.get("/autores/:id", autorController.listarAutorPorId);
routes.post("/autores", autorController.cadastrarAutor);
routes.put("/autores/:id", autorController.atualizarAutor);
routes.delete("/autores/:id", autorController.excluirAutor);

export default routes;
