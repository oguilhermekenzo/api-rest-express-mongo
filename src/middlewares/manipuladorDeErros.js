/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import RequesicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";

function manipuladorDeErros(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new RequesicaoIncorreta().enviarResposta(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(err).enviarResposta(res);
  } else if (err instanceof ErroBase) {
    err.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
