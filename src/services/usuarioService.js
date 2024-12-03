const usuarioModel = require('../models/usuarioModel.js')

const cadastrarUsuario = async (nome, email, senha, telefone, dataNascimento) => {
   
    const result = await usuarioModel.criarUsuario(nome, email, senha, telefone, dataNascimento)
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

const atualizarPerfil = async (id, email, senha) => {
    try {
        // Chama o model para atualizar o perfil no banco de dados
        const usuarioAtualizado = await usuarioModel.atualizarPerfil(id, email, senha);

        if (!usuarioAtualizado) {
            return null;  // Caso não tenha sido possível atualizar
        }

        return usuarioAtualizado;  // Retorna o usuário atualizado
    } catch (err) {
        console.error('Erro ao atualizar perfil:', err);
        throw new Error('Erro ao atualizar perfil.');
    }
};



module.exports = {
    cadastrarUsuario,
    autenticarUsuario,
    procurarPeloEmail,
    buscarPerfilUsuario,
    atualizarPerfil
}