const espacoModel = require('../models/espacoModel.js')

const obterEspacos = async () => {
    const result = await espacoModel.obterEspacos();
    return result
}

async function obterEspacoPorId(id) {
    try {
        const espaco = await espacoModel.buscarPorId(id); // Chama o model para buscar o espaço no banco de dados
        return espaco;
    } catch (error) {
        console.error('Erro no service ao buscar espaço:', error);
        throw error;
    }
}

module.exports = {
    obterEspacos,
    obterEspacoPorId
}