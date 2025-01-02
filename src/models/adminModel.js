const db = require('../db.js');

// Fetch a user by ID
async function obterUsuarioPorId(usrId) {
    try {
        const [result] = await db.query('SELECT * FROM users WHERE id_usr = ?;', [usrId]);
        return result.length ? result[0] : null;
    } catch (err) {
        console.error('Erro ao obter usuário por ID:', err);
        throw new Error('Erro ao obter usuário');
    }
}

// Suspend a user
async function suspenderUsuario(usrId, reason) {
    try {
        const query = `UPDATE users SET suspended = 1, suspension_reason = ? WHERE id_usr = ?;`;
        await db.query(query, [reason, usrId]);
        return true;
    } catch (err) {
        console.error('Erro ao suspender usuário:', err);
        throw new Error('Erro ao suspender usuário');
    }
}

// Delete a user
async function deletarUsuario(usrId) {
    try {
        await db.query('DELETE FROM users WHERE id_usr = ?;', [usrId]);
        return true;
    } catch (err) {
        console.error('Erro ao deletar usuário:', err);
        throw new Error('Erro ao deletar usuário');
    }
}

// Search users by username
async function buscarUsuariosPorNome(username) {
    try {
        const [results] = await db.query('SELECT * FROM users WHERE username LIKE ?;', [`%${username}%`]);
        return results;
    } catch (err) {
        console.error('Erro ao buscar usuários por nome:', err);
        throw new Error('Erro ao buscar usuários');
    }
}

module.exports = {
    obterUsuarioPorId,
    suspenderUsuario,
    deletarUsuario,
    buscarUsuariosPorNome
};
