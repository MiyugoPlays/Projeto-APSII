const adminModel = require('../models/adminModel');

async function getUserById(id) {
    return await adminModel.obterUsuarioPorId(id);
}

async function suspendUser(id, reason) {
    return await adminModel.suspenderUsuario(id, reason);
}

async function deleteUser(id) {
    return await adminModel.deletarUsuario(id);
}

async function searchUsersByName(username) {
    return await adminModel.buscarUsuariosPorNome(username);
}

module.exports = {
    getUserById,
    suspendUser,
    deleteUser,
    searchUsersByName
};
