import livro from "../models/Livro.js";
import { autores } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();

      req.resultado = buscaLivros;

      next();
    } catch (err) {
      next(err);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const listaLivroEncontrado = await livro.findById(id);
      res.status(200).json(listaLivroEncontrado);
    } catch (err) {
      next(err);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autores.findById(novoLivro.autor);
      const livroCompleto = {
        ...novoLivro,
        autor: { ...autorEncontrado._doc },
      };
      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ message: "criado com sucesso", livro: livroCriado });
    } catch (err) {
      next(err);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "livro atualizado com sucesso" });
    } catch (err) {
      next(err);
    }
  }

  static async excluirLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "livro excluído com sucesso" });
    } catch (err) {
      next(err);
    }
  }

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const listaLivros = livro.find(busca).populate("autor");

        req.resultado = listaLivros;

        next();
      } else {
        res.status(200).json([]);
      }
    } catch (err) {
      next(err);
    }
  }
}

async function processaBusca(params) {
  const { editora, titulo, minPag, maxPag, nomeAutor } = params;

  let busca = {};

  if (editora) {
    busca.editora = editora;
  }

  if (titulo) {
    busca.titulo = { $regex: titulo, $options: "i" };
  }

  if (minPag || maxPag) {
    busca.paginas = {};
    if (minPag) {
      busca.paginas.$gte = Number(minPag);
    }
    if (maxPag) {
      busca.paginas.$lte = Number(maxPag);
    }
  }

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }
  return busca;
}

export default LivroController;
