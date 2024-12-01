const db = require('../db.js');

async function obterEspacos() {
        try {
            const [results] = await db.query('SELECT * FROM espacos');
            return results;
        } catch (err) {
            throw new Error('Erro ao obter espaços: ' + err.message);
        }
};

async function buscarPorId(id) {
    try {
        const [result] = await db.query('SELECT * FROM espacos WHERE id = ?', [id]);
        return result.length ? result[0] : null; // Retorna o primeiro resultado ou null se não encontrado
    } catch (error) {
        console.error('Erro ao buscar espaço no model:', error);
        throw error;
    }
}

// Função para buscar os espaços de um usuário específico
async function buscarEspacosPorUsuario(usuarioId) {
    try {
        // Consulta SQL para buscar espaços que pertencem ao usuarioId
        const [results] = await db.query('SELECT * FROM espacos WHERE usuario_id = ?', [usuarioId]);
        return results;
    } catch (err) {
        console.error('Erro ao buscar espaços por usuário no model:', err);
        throw new Error('Erro ao buscar espaços por usuário: ' + err.message);
    }
}

// Função para adicionar um novo espaço no banco de dados
async function adicionarEspaco(dadosEspaco) {
    const { nome, descricao, capacidade, preco, cep, rua, numero, complemento, bairro, cidade, estado_sigla, status, imagem, usuario_id } = dadosEspaco;

    try {
        // Consulta SQL para inserir o novo espaço no banco de dados
        const query = `
            INSERT INTO espacos (nome, descricao, capacidade, preco, cep, rua, numero, complemento, bairro, cidade, estado_sigla, status, imagem, usuario_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Array de valores a serem passados para a query
        const values = [nome, descricao, capacidade, preco, cep, rua, numero, complemento, bairro, cidade, estado_sigla, status, imagem, usuario_id];

        // Executa a query no banco
        const [result] = await db.query(query, values);

        // Retorna os dados do novo espaço inserido (incluindo o ID gerado)
        return { ...dadosEspaco, id: result.insertId };
    } catch (error) {
        console.error('Erro ao adicionar espaço no model:', error);
        throw new Error('Erro ao adicionar espaço no banco de dados');
    }
}

module.exports = {
     obterEspacos,
     buscarPorId,
     buscarEspacosPorUsuario,
     adicionarEspaco
    } 