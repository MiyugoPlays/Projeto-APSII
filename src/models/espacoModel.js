const db = require('../db.js');

async function obterEspacos() {
        try {
            const [results] = await db.query('SELECT * FROM espacos');
            return results;
        } catch (err) {
            throw new Error('Erro ao obter espaços: ' + err.message);
        }
};

async function buscarPorId(id) {
    try {
        const [result] = await db.query('SELECT * FROM espacos WHERE id = ?', [id]);
        return result.length ? result[0] : null; // Retorna o primeiro resultado ou null se não encontrado
    } catch (error) {
        console.error('Erro ao buscar espaço no model:', error);
        throw error;
    }
}

// Função para buscar os espaços de um usuário específico
async function buscarEspacosPorUsuario(usuarioId) {
    try {
        // Consulta SQL para buscar espaços que pertencem ao usuarioId
        const [results] = await db.query('SELECT * FROM espacos WHERE usuario_id = ?', [usuarioId]);
        return results;
    } catch (err) {
        console.error('Erro ao buscar espaços por usuário no model:', err);
        throw new Error('Erro ao buscar espaços por usuário: ' + err.message);
    }
}

module.exports = {
     obterEspacos,
     buscarPorId,
     buscarEspacosPorUsuario
    } 