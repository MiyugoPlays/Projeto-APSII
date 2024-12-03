const espacoModel = require('../models/espacoModel.js')

const obterEspacos = async () => {
    const result = await espacoModel.obterEspacos();
    return result
}

async function obterEspacoPorId(id) {
    try {
        const espaco = await espacoModel.buscarPorId(id); // Chama o model para buscar o espaço no banco de dados
        return espaco;
    } catch (error) {
        console.error('Erro no service ao buscar espaço:', error);
        throw error;
    }
}

// Função para listar os espaços de um usuário específico
const listarEspacosPorUsuario = async (usuarioId) => {
    try {
        const espacos = await espacoModel.buscarEspacosPorUsuario(usuarioId); // Chama o model passando o usuarioId
        return espacos;
    } catch (error) {
        console.error('Erro no service ao buscar espaços por usuário:', error);
        throw error;
    }
};

// Função para adicionar um novo espaço no banco de dados
const adicionarEspaco = async (dadosEspaco) => {
    const { nome, descricao, capacidade, preco, cep, rua, numero, complemento, bairro, cidade, estado_sigla, status, imagem, usuario_id } = dadosEspaco;

    try {
        // Chama o model para adicionar o espaço no banco de dados
        const result = await espacoModel.adicionarEspaco({
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
        });

        return result;
    } catch (error) {
        console.error('Erro ao adicionar espaço no service:', error);
        throw error;
    }
};

const editarEspaco = async (dadosEspaco) => {
    const { id, editnome, editdescricao, editcapacidade, editpreco, editcep, editrua, editnumero, editcomplemento, editbairro, editcidade, editestado_sigla, editimagem } = dadosEspaco;

    try {
        // Atualiza o espaço com os dados recebidos
        const espacoAtualizado = await espacoModel.editarEspaco(id, {
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
            editimagem
        });

        return espacoAtualizado;
    } catch (error) {
        console.error('Erro ao editar espaço no service:', error);
        throw error;
    }
};

const excluirEspaco = async (id) => {
    try {
        const resultado = await espacoModel.excluirEspaco(id); // Chama o model para excluir o espaço
        return resultado;
    } catch (error) {
        console.error('Erro ao excluir espaço no service:', error);
        throw error;
    }
};

module.exports = {
    obterEspacos,
    obterEspacoPorId,
    listarEspacosPorUsuario,
    adicionarEspaco,
    editarEspaco,
    excluirEspaco
}