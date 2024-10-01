const espacoService = require('../services/espacoService');

const listarEspacos = async (req, res) => {
    try {
        const espacos = await espacoService.obterEspacos();
        res.json(espacos); // Retorna os dados em JSON
    } catch (error) {
        res.status(500).send('Erro ao obter espaços');
    }
};

module.exports = {
    listarEspacos,
};

