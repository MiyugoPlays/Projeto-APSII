const db = require('../db.js');

async function listarReservasDoEspaco(espacoId) {
    try {
        const query = `
            SELECT 
                reservas.id, 
                reservas.id_usuario, 
                usuarios.nome AS nome_usuario, 
                reservas.data_inicio, 
                reservas.data_fim, 
                reservas.status, 
                reservas.forma_pagamento 
            FROM reservas
            INNER JOIN usuarios ON reservas.id_usuario = usuarios.id
            WHERE reservas.id_espaco = ?`;
        
        const [result] = await db.query(query, [espacoId]); // Executa a consulta com o JOIN
        return result; // Retorna as reservas com o nome do usuário
        
    } catch (error) {
        throw new Error('Erro ao consultar as reservas no banco de dados');
    }
}

async function listarReservasDoUsuario(idUsuario) {
    try {
        const query = `
            SELECT 
                reservas.id,
                reservas.id_espaco,
                reservas.data_inicio,
                reservas.data_fim,
                reservas.status,
                reservas.forma_pagamento,
                espacos.nome AS nome_espaco
            FROM reservas
            INNER JOIN espacos ON reservas.id_espaco = espacos.id
            WHERE reservas.id_usuario = ?`;

    
        const [result] = await db.query(query, [idUsuario]); // Executa a consulta
       
        return result;
    } catch (error) {
        console.error('Erro ao consultar as reservas do usuário:', error); // Log do erro
        throw new Error('Erro ao consultar as reservas do usuário no banco de dados');
    }
}

async function alterarStatusReserva(reservaId, status) {
    try {
        // Atualiza o status da reserva
        const query = `
            UPDATE reservas 
            SET status = ? 
            WHERE id = ?`;

        const [result] = await db.query(query, [status, reservaId]);


        return result;  // Retorna a reserva atualizada

    } catch (error) {
        console.error('Erro ao alterar status da reserva:', error);
        throw new Error('Erro ao alterar status da reserva');
    }
}

const reservarEspaco = async (data_inicio, data_fim, forma_pagamento, espaco_id, usuarioId) => {
    try {
        // Cria a reserva no banco de dados com as informações fornecidas
        const queryInsert = `
            INSERT INTO reservas (data_inicio, data_fim, forma_pagamento, id_espaco, id_usuario, status)
            VALUES (?, ?, ?, ?, ?, 'pendente')
        `;
  
        // Executa a query para inserir a nova reserva
        const [result] = await db.query(queryInsert, [
            data_inicio,
            data_fim,
            forma_pagamento,
            espaco_id,
            usuarioId
        ]);

        return result;  // Retorna o resultado da operação de inserção
    } catch (error) {
        console.error('Erro ao realizar a reserva:', error);
        throw new Error('Erro ao realizar a reserva');  // Lança erro caso falhe
    }
};



module.exports = {
    listarReservasDoEspaco,
    listarReservasDoUsuario,
    alterarStatusReserva,
    reservarEspaco
  
    
}
