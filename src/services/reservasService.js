const reservasModel = require('../models/reservasModel.js');

// Função para listar as reservas de um espaço
const listarReservasDoEspaco = async (espacoId) => {
    try {
        const reservas = await reservasModel.listarReservasDoEspaco(espacoId);
        return reservas;
    } catch (error) {
        throw new Error('Erro no serviço ao listar as reservas');
    }
};

module.exports = {
    listarReservasDoEspaco
};