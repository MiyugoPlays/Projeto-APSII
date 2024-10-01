const Espaco = require('../models/espacoModel.js')

const obterEspacos = async () => {
    return await Espaco.obterEspacos();
}

module.exports = {
    obterEspacos,
}