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
        

        return res.json(reservas);
    } catch (error) {
        console.error('Erro ao listar reservas:', error);
        return res.status(500).json({ message: 'Erro ao listar reservas' });
    }
};

// Função para listar as reservas de um usuário
const listarReservasDoUsuario = async (req, res) => {
    const usuarioId = req.cookies.usuarioId; // Pega o ID do usuário da URL

    try {
        // Chama o Service para obter as reservas do usuário
        const reservas = await reservasService.listarReservasDoUsuario(usuarioId);

        // Retorna as reservas em formato JSON
        res.json(reservas);
    } catch (error) {
        console.error('Erro ao buscar as reservas do usuário:', error);
        res.status(500).json({ message: 'Erro ao consultar as reservas do usuário.' });
    }
};

const alterarStatusReserva = async (req, res) => {
    const reservaId = req.params.id;  // ID da reserva vindo da URL
    const { status } = req.body;      // Novo status vindo do corpo da requisição

    try {
        // 1. Atualizar o status da reserva no banco de dados
        const reservaAtualizada = await reservasService.alterarStatusReserva(reservaId, status);

        if (!reservaAtualizada) {
            return res.status(404).json({ message: 'Reserva não encontrada ou status não alterado' });
        }

        // 2. Retornar a resposta de sucesso
        return res.status(200).json({ message: 'Status da reserva alterado com sucesso', reserva: reservaAtualizada });

    } catch (error) {
        console.error('Erro ao alterar o status da reserva:', error);
        return res.status(500).json({ message: 'Erro ao alterar o status da reserva' });
    }
};

const reservarEspaco = async (req, res) => {
    const { data_inicio, data_fim, forma_pagamento } = req.body;
  
    const espaco_id = parseInt(req.params.id);  // Converte para número inteiro
    const usuarioId = parseInt(req.cookies.usuarioId);  // Converte para número inteiro
    
    try {
        // Chama o serviço para salvar a reserva
        const reserva = await reservasService.reservarEspaco(data_inicio, data_fim, forma_pagamento,  espaco_id, usuarioId);
        res.status(201).json(reserva);  // Retorna a reserva criada com status 201
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Erro ao realizar a reserva', error });  // Retorna erro com status 400
    }
};

module.exports = {
    listarReservasDoEspaco,
    listarReservasDoUsuario,
    alterarStatusReserva,
    reservarEspaco
};