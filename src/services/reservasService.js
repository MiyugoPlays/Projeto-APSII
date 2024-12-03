const reservasModel = require('../models/reservasModel.js');
const espacoModel = require('../models/espacoModel.js')


// Função para listar as reservas de um espaço
const listarReservasDoEspaco = async (espacoId) => {
    try {
        const reservas = await reservasModel.listarReservasDoEspaco(espacoId);
        return reservas;
    } catch (error) {
        throw new Error('Erro no serviço ao listar as reservas');
    }
};

const listarReservasDoUsuario = async (idUsuario) => {
    try {
        // Chama o Model para listar as reservas do usuário
        const reservas = await reservasModel.listarReservasDoUsuario(idUsuario);
        return reservas; // Retorna as reservas para o controller
    } catch (error) {
        throw new Error('Erro ao obter as reservas do usuário');
    }
};

const alterarStatusReserva = async (reservaId, status) => {
    try {
        const reservas = await reservasModel.alterarStatusReserva(reservaId, status);
        return reservas;
    } catch (error) {
        throw new Error('Erro no serviço ao listar as reservas');
    }
};

const reservarEspaco = async (data_inicio, data_fim, forma_pagamento, espaco_id, usuarioId) => {
    try {
        // Chama o model para adicionar a reserva no banco de dados
        const result = await reservasModel.reservarEspaco(data_inicio, data_fim, forma_pagamento, espaco_id, usuarioId);
        return result;  // Retorna o resultado da reserva
    } catch (error) {
        console.error('Erro ao adicionar reserva no service:', error);
        throw error;  // Lança o erro caso ocorra
    }
};

module.exports = {
    listarReservasDoEspaco,
    listarReservasDoUsuario,
    alterarStatusReserva,
    reservarEspaco
    
};