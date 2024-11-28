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

module.exports = {
     obterEspacos,
     buscarPorId
    } 