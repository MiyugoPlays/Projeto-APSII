const usuarioModel = require('../models/usuarioModel.js')

const cadastrarUsuario = async (email, senha) => {
    if (!email || !senha) {
        throw new Error('Email e senha é obrigatorio')
    }

    const result = await usuarioModel.criarUsuario(email, senha)
    return result
}

const autenticarUsuario = async (email, senha) => {
    const user = await usuarioModel.procurarPeloEmail(email); // Usa o model para buscar o usuário

    if (!user) {
        throw new Error('Email ou senha incorretos.');
    }

    if (senha !== user.senha) {
        throw new Error('Email ou senha incorretos.');
    }

    return user; // Retorna o usuário (ou informações desejadas)
};

const procurarPeloEmail = async (email) => {
    return await usuarioModel.procurarPeloEmail(email);
};

const buscarPerfilUsuario = async (usuarioId) => {
  return await usuarioModel.buscarPerfilUsuario(usuarioId);
};

module.exports = {
    cadastrarUsuario,
    autenticarUsuario,
    procurarPeloEmail,
    buscarPerfilUsuario
}