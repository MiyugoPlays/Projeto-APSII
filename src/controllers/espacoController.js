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

async function obterEspacoPorId(req, res) {
    const espacoId = req.params.id; // Obtém o ID do espaço da URL

    try {
        const espaco = await espacoService.obterEspacoPorId(espacoId); // Chama o serviço

        if (!espaco) {
            return res.status(404).json({ message: 'Espaço não encontrado' });
        }

        // Retorna os detalhes do espaço
        res.json(espaco);
    } catch (error) {
        console.error('Erro ao carregar espaço:', error);
        res.status(500).json({ message: 'Erro ao carregar espaço' });
    }
}

const listarEspacosPorUsuario = async (req, res) => {
    try {
        const usuarioId = req.cookies.usuarioId; // Obtém o usuarioId do cookie (certifique-se de que está configurado corretamente)

        if (!usuarioId) {
            return res.status(401).json({ message: 'Usuário não autenticado' }); // Caso o cookie não esteja presente
        }

        const espacos = await espacoService.listarEspacosPorUsuario(usuarioId); // Passa o usuarioId para o service

        if (espacos.length === 0) {
            return res.status(404).json({ message: 'Nenhum espaço encontrado para este usuário' });
        }

        res.status(200).json(espacos); // Retorna os espaços encontrados
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao listar espaços do usuário');
    }
};

module.exports = {
    listarEspacos,
    obterEspacoPorId,
    listarEspacosPorUsuario
};

