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

async function editarEspaco(id, dadosEspaco) {
    const { editnome, editdescricao, editcapacidade, editpreco, editcep, editrua, editnumero, editcomplemento, editbairro, editcidade, editestado_sigla, editimagem } = dadosEspaco;

    try {
        // Preparar a query de atualização
        const query = `
            UPDATE espacos 
            SET nome = ?, descricao = ?, capacidade = ?, preco = ?, cep = ?, rua = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado_sigla = ?, imagem = ?
            WHERE id = ?
        `;
        
        const values = [
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
            editimagem,  // Passa a imagem (pode ser atualizada ou a mesma)
            id
        ];

        const [result] = await db.query(query, values);

        // Verifica se algum registro foi atualizado
        if (result.affectedRows === 0) {
            return null; // Nenhum registro foi atualizado
        }

        return { id, ...dadosEspaco }; // Retorna o espaço atualizado
    } catch (error) {
        console.error('Erro ao editar espaço no model:', error);
        throw new Error('Erro ao editar espaço no banco de dados');
    }
}

// Função para excluir um espaço do banco de dados
async function excluirEspaco(id) {
    try {
        // Query SQL para excluir o espaço com o ID fornecido
        const query = 'DELETE FROM espacos WHERE id = ?';
        const [result] = await db.query(query, [id]);

        // Verifica se algum registro foi excluído
        if (result.affectedRows === 0) {
            throw new Error('Nenhum espaço encontrado para excluir');
        }

        return result;
    } catch (error) {
        console.error('Erro ao excluir espaço no model:', error);
        throw new Error('Erro ao excluir o espaço no banco de dados');
    }
}

module.exports = {
     obterEspacos,
     buscarPorId,
     buscarEspacosPorUsuario,
     adicionarEspaco,
     editarEspaco,
     excluirEspaco
    } 