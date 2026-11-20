import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    editora: { type: String},
    preco: { type: Number },
    paginas: { type: Number },
    autor: autorSchema
});

const livro = mongoose.model("livro", livroSchema, "livro");

export default livro;