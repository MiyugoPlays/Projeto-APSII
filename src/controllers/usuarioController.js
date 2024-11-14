const usuarioService = require('../services/usuarioService');

const cadastrar = async (req, res) => {
    const {email, senha} = req.body

    try {
        const result = await usuarioService.cadastrarUsuario(email, senha)
        const user = await usuarioService.autenticarUsuario(email, senha);
        res.cookie('usuarioId', user.id, { httpOnly: true });
        res.status(201).json({ message: 'Usuario cadastrado com sucesso', userId: result.insertId})
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await usuarioService.autenticarUsuario(email, senha);
        res.cookie('usuarioId', user.id, { httpOnly: true })

        res.status(200).json({ message: 'Login bem-sucedido!', user });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const verificarEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const usuario = await usuarioService.procurarPeloEmail(email);
        res.json({ existe: !!usuario }); // Retorna true se o usuário existir
    } catch (error) {
        res.status(500).send('Erro ao verificar email');
    }
};

const mostrarPerfil = async (req, res) => {
    const usuarioId = req.cookies.usuarioId;  // Pega o ID do usuário do cookie
  
    if (!usuarioId) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
  
    try {
      // Buscando o perfil do usuário no serviço
      const usuario = await usuarioService.buscarPerfilUsuario(usuarioId);
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      // Envia os dados do usuário como resposta
      res.json(usuario);
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      res.status(500).json({ message: 'Erro ao buscar perfil do usuário.' });
    }
};

const atualizarPerfil = async (req, res) => {
    const usuarioId = req.cookies.usuarioId;  // Pega o ID do usuário do cookie
    const { email, senha } = req.body;  // Pega os novos dados de email e senha do corpo da requisição

    if (!usuarioId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    try {
        // Atualiza o perfil do usuário no banco de dados usando o ID do cookie
        const usuarioAtualizado = await usuarioService.atualizarPerfil(usuarioId, email, senha);

        if (!usuarioAtualizado) {
            return res.status(404).json({ message: 'Usuário não encontrado ou não foi atualizado.' });
        }

        // Envia o perfil atualizado como resposta
        res.json({
            success: true,
            message: 'Perfil atualizado com sucesso!',
            user: usuarioAtualizado
        });
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ message: 'Erro ao atualizar perfil.' });
    }
};



module.exports = {
    cadastrar,
    login,
    verificarEmail,
    mostrarPerfil,
    atualizarPerfil
}
