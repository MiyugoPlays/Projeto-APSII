const reservasService = require('../services/reservasService.js');
const espacoService = require('../services/espacoService.js');

// Função para listar as reservas de um espaço
const listarReservasDoEspaco = async (req, res) => {
    const espacoId = req.params.id; // Obtém o ID do espaço a ser excluído da URL
    const usuarioId = req.cookies.usuarioId; // Obtém o ID do usuário autenticado

    try {
        const espaco = await espacoService.obterEspacoPorId(espacoId);

        if (!espaco) {
            return res.status(404).json({ message: 'Espaço não encontrado' });
        }
        
        console.log(espaco.usuario_id)
        console.log(usuarioId)

        // Verifica se o usuário é o proprietário do espaço
        if (Number(espaco.usuario_id) !== Number(usuarioId)) {
            return res.status(403).json({ message: 'Você não tem permissão para excluir este espaço.' });
        }
        console.log("Buscando reservas para o espaço ID: ", espacoId); //teste
        const reservas = await reservasService.listarReservasDoEspaco(espacoId);
        console.log("Reservas encontradas:", reservas); //teste
        if (reservas.length === 0) {
            return res.status(404).json({ message: 'Nenhuma reserva encontrada para este espaço.' });
        }
        return res.json(reservas);
    } catch (error) {
        console.error('Erro ao listar reservas:', error);
        return res.status(500).json({ message: 'Erro ao listar reservas' });
    }
};

module.exports = {
    listarReservasDoEspaco
};