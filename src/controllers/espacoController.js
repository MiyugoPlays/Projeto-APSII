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

const editarEspaco = async (req, res) => {
    try {
    
        const espacoId = req.params.id;
        const { editnome, editdescricao, editcapacidade, editpreco, editcep, editrua, editnumero, editcomplemento, editbairro, editcidade, editestado_sigla } = req.body;

        // Verifica se a imagem foi enviada, se não, mantém a imagem atual
        const editimagem = req.file ? '/assets/uploads/' + req.file.filename : null;

         // Recupera o espaço atual do banco de dados para pegar a imagem atual
         const espacoAtual = await espacoService.obterEspacoPorId(espacoId);
         const imagemAtual = espacoAtual ? espacoAtual.imagem : null;
 
          // Se nenhuma imagem for fornecida, usa a imagem atual do banco de dados
          const imagemFinal = editimagem || imagemAtual;

        const dadosEspaco = {
            id: espacoId,  // Inclui o ID do espaço
            editnome,
            editdescricao,
            editcapacidade,
            editpreco,
            editcep,
            editrua,
            editnumero,
            editcomplemento,
            editbairro,
            editcidade,
            editestado_sigla,
            editimagem: imagemFinal
        };

        // Passa os dados para o service
        const espacoAtualizado = await espacoService.editarEspaco(dadosEspaco);

        if (!espacoAtualizado) {
            return res.status(404).json({ message: 'Espaço não encontrado' });
        }

        res.status(200).json({ message: 'Espaço atualizado com sucesso', espaco: espacoAtualizado });
    } catch (error) {
        console.error('Erro ao editar espaço:', error);
        res.status(500).json({ message: 'Erro ao editar o espaço' });
    }
};

const excluirEspaco = async (req, res) => {
    const espacoId = req.params.id; // Obtém o ID do espaço a ser excluído da URL
    const usuarioId = req.cookies.usuarioId; // Obtém o ID do usuário autenticado

    try {
        // Verifica se o espaço existe
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

        // Chama o serviço para excluir o espaço
        await espacoService.excluirEspaco(espacoId);

        res.status(200).json({ message: 'Espaço excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir espaço:', error);
        res.status(500).json({ message: 'Erro ao excluir o espaço' });
    }
};


module.exports = {
    listarEspacos,
    obterEspacoPorId,
    listarEspacosPorUsuario,
    adicionarEspaco,
    editarEspaco,
    excluirEspaco
};

