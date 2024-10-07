const db = require('../db.js');

const criarUsuario = async (email, senha) => {
    const result = await db.query('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, senha]);
    return result[0]; // Retorna o resultado da inserção
};

const procurarPeloEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0]; // Retorna o primeiro usuário encontrado ou undefined
};

module.exports = {
    criarUsuario,
    procurarPeloEmail,
}