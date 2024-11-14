const db = require('../db.js');

const criarUsuario = async (email, senha) => {
    const result = await db.query('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, senha]);
    return result[0]; // Retorna o resultado da inserção
};

const procurarPeloEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0]; // Retorna o primeiro usuário encontrado ou undefined
};

// Função para buscar os dados do usuário
const buscarPerfilUsuario = async (usuarioId) => {
  try {
    const [results] = await db.query('SELECT senha, email FROM usuarios WHERE id = ?', [usuarioId]);

    return results[0]; // Retorna o primeiro resultado (o usuário encontrado)
  } catch (err) {
    // Se ocorrer algum erro, lança uma exceção com a mensagem do erro
    throw new Error('Erro ao obter perfil do usuário: ' + err.message);
  }
};

const atualizarPerfil = async (id, email, senha) => {
  const result = await db.query('UPDATE usuarios SET email = ?, senha = ? WHERE id = ?', [email, senha, id]);
  return result[0]; // Retorna o usuário atualizado
};

module.exports = {
    criarUsuario,
    procurarPeloEmail,
    buscarPerfilUsuario,
    atualizarPerfil
}