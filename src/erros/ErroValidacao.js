import RequesicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequesicaoIncorreta {
  constructor(err) {
    const messagensErro = Object.values(err.errors)
      .map((erro) => erro.message)
      .join(", ");
    super(`Houve um erro de validação de dados: ${messagensErro}`);
  }
}

export default ErroValidacao;
