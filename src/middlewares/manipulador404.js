import NaoEncontrado from "../erros/NaoEncontrado.js";

/* eslint-disable no-unused-vars */
function manipulador404(req, res, next) {
    const err404 = new NaoEncontrado();
    next(err404);
}

export default manipulador404;
