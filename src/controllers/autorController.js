import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find({});
      res.status(200).json(autoresResultado);
    } catch (err) {
      next(err);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next(new NaoEncontrado("Id do autor não localizado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      const novoAutor = await autores.create(req.body);
      res
        .status(201)
        .json({ message: "autor criado com sucesso", autor: novoAutor });
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorAtualizado = await autores.findByIdAndUpdate(id, req.body);

      if (autorAtualizado !== null) {
        res.status(200).json({ message: "autor atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do autor não localizado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorExcluido = await autores.findByIdAndDelete(id);

      if (autorExcluido !== null) {
        res.status(200).json({ message: "autor excluído com sucesso" });
      } else {
        next(new NaoEncontrado("Id do autor não localizado"));
      }
    } catch (err) {
      next(err);
    }
  };
}

export default AutorController;
