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

// Função para adicionar um novo espaço
const adicionarEspaco = async (req, res) => {
    try {
        // Obtém os dados do formulário
        const { nome, descricao, capacidade, preco, cep, rua, numero, complemento, bairro, cidade, estado_sigla } = req.body;

        // Verifica se a imagem foi enviada
        if (!req.file) {
            return res.status(400).json({ message: 'A imagem do espaço é obrigatória.' });
        }

        // O caminho da imagem será o nome do arquivo armazenado
        const imagem = '/assets/uploads/' + req.file.filename;

        // O status será sempre "disponivel" na criação
        const status = 'disponivel';

        // Aqui, estamos assumindo que o usuário está autenticado e o ID do usuário está disponível na sessão.
        const usuario_id = req.cookies.usuarioId;

        // Preparando os dados para envio ao serviço
        const dadosEspaco = {
            nome,
            descricao,
            capacidade,
            preco,
            cep,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado_sigla,
            status,
            imagem,
            usuario_id
        };

        // Chamando o serviço para adicionar o espaço no banco de dados
        const novoEspaco = await espacoService.adicionarEspaco(dadosEspaco);

        res.status(201).json({ message: 'Espaço adicionado com sucesso!', espaco: novoEspaco });
    } catch (error) {
        console.error('Erro ao adicionar espaço:', error);
        res.status(500).json({ message: 'Erro ao adicionar o espaço.' });
    }
};

module.exports = {
    listarEspacos,
    obterEspacoPorId,
    listarEspacosPorUsuario,
    adicionarEspaco
};

