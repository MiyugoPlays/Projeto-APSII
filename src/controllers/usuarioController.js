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

module.exports = {
    cadastrar,
    login,
    verificarEmail,
}
