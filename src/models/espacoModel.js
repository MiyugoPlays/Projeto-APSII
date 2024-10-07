const db = require('../db.js');

const Espaco = {
    obterEspacos: async () => {
        try {
            const [results] = await db.query('SELECT * FROM espacos');
            return results;
        } catch (err) {
            throw new Error('Erro ao obter espaços: ' + err.message);
        }
    }
};


module.exports = Espaco;