const db = require('../db.js');

async function listarReservasDoEspaco(espacoId) {
    
    try {
        const query = 'SELECT id, id_usuario, data_inicio, data_fim, status, forma_pagamento FROM reservas WHERE id_espaco = ?';
        const [result] = await db.query(query, [espacoId]); // Aguarda o retorno da consulta
        return result; // Retorna as reservas do banco
    } catch (error) {
        throw new Error('Erro ao consultar as reservas no banco de dados'); // Lida com erros
    }
}

module.exports = {
    listarReservasDoEspaco
}
