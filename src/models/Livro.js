import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: {
    type: String,
    required: [true, "O título do livro é obrigatório"],
  },
  editora: {
    type: String,
    required: [true, "A editora do livro é obrigatória"],
    enum: {
      values: ["Editora 1", "Editora 2", "Editora 3"],
      message:
        "A editora {VALUE} deve ser uma das seguintes: Editora 1, Editora 2, Editora 3",
    },
  },
  preco: { type: Number },
  paginas: {
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message:
        "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}",
    },
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O(a) autor(a) do livro é obrigatório"],
  },
});

const livro = mongoose.model("livro", livroSchema, "livro");

export default livro;
