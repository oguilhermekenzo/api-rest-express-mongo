import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {
  static async listarLivros(req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha ao listar livros` });
    }
  }

  static async listarLivroPorId(req, res) {
    try {
      const id = req.params.id;
      const listaLivroEncontrado = await livro.findById(id);
      res.status(200).json(listaLivroEncontrado);
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha ao listar livro encontrado` });
    }
  }

  static async cadastrarLivro(req, res) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha ao cadastrar livro` });
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "livro atualizado com sucesso" });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha na atualização do livro` });
    }
  }

  static async excluirLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "livro excluído com sucesso" });
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha na exclusão do livro` });
    }
  }

  static async listarLivrosPorEditora(req, res) {
    const editora = req.query.editora;
    try {
      const listaLivros = await livro.find({ editora: editora });
      res.status(200).json(listaLivros);
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - falha ao listar livros por editora` });
    }
  }
}

export default LivroController;
