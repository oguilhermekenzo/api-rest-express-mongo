import { autor } from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autor.find({});
      res.status(200).json(autoresResultado);
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha ao listar autores` });
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const autorResultado = await autor.findById(id);
      res.status(200).json(autorResultado);
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha ao listar autor encontrado` });
    }
  }

  static cadastrarAutor = async (req, res) => {
    try {
      const novoAutor = await autor.create(req.body);
      res
        .status(201)
        .json({ message: "autor criado com sucesso", autor: novoAutor });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha ao cadastrar autor` });
    }
  }

  static atualizarAutor = async (req, res) => {
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

  static excluirAutor = async (req, res) => {
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
