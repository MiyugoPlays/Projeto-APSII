const db = require('../db.js');

// Fetch all locations
async function obterLocais() {
    try {
        const [results] = await db.query('SELECT * FROM locations;');
        return results;
    } catch (err) {
        console.error('Erro ao obter locais:', err);
        throw new Error('Erro ao obter locais do banco de dados');
    }
}

// Fetch a location by ID
async function buscarLocalPorId(idLocal) {
    try {
        const [result] = await db.query('SELECT * FROM locations WHERE id_local = ?;', [idLocal]);
        return result.length ? result[0] : null;
    } catch (err) {
        console.error('Erro ao buscar local por ID:', err);
        throw new Error('Erro ao buscar local');
    }
}

module.exports = {
    obterLocais,
    buscarLocalPorId
};
