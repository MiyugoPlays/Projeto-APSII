const espacoService = require('../services/espacoService');

const listarEspacos = async (req, res) => {
    try {
        const espacos = await espacoService.obterEspacos();
        res.status(200).json(espacos); // Retorna os dados em JSON
    } catch (error) {
        console.error(error)
        res.status(500).send('Erro ao obter espaços');
    }
};

module.exports = {
    listarEspacos,
};

