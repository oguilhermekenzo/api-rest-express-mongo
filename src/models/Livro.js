import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { 
        type: String, 
        required: [true, "O título do livro é obrigatório"] },
    editora: { 
        type: String,
        required: [true, "A editora do livro é obrigatória"] },
    preco: { type: Number },
    paginas: { type: Number },
    autor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "autores",
        required: [true, "O(a) autor(a) do livro é obrigatório"] }
});

const livro = mongoose.model("livro", livroSchema, "livro");

export default livro;