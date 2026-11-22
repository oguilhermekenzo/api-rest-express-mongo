import ErroBase from "./erroBase.js";

class RequesicaoIncorreta extends ErroBase {
  constructor(messagem = "Um ou mais dados estão incorretos") {
    super(messagem, 400);
  }
}

export default RequesicaoIncorreta;
