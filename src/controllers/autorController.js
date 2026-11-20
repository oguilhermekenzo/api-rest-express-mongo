import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutores(req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha ao listar autores` });
    }
  }

  static async listarAutorPorId(req, res) {
    try {
      const id = req.params.id;
      const listaAutorEncontrado = await autor.findById(id);
      res.status(200).json(listaAutorEncontrado);
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha ao listar autor encontrado` });
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "autor criado com sucesso", autor: novoAutor });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha ao cadastrar autor` });
    }
  }

  static async atualizarAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "autor atualizado com sucesso" });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha na atualização do autor` });
    }
  }

  static async excluirAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "autor excluído com sucesso" });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha na exclusão do autor` });
    }
  }
}

export default AutorController;
