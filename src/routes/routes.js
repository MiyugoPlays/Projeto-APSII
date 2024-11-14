const express = require('express');
const path = require('path');
const router = express.Router();
const espacoController = require('../controllers/espacoController.js');
const usuarioController = require('../controllers/usuarioController.js');

// Middleware de verificação de autenticação
const verificarAutenticacao = (req, res, next) => {
    const { usuarioId } = req.cookies; // Lê o ID do usuário do cookie

    if (!usuarioId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    // Se necessário, você pode verificar o ID do usuário no banco de dados aqui

    next(); // Chama o próximo middleware ou rota
};

// --------- Rotas Públicas (sem necessidade de autenticação) ---------

// Rota para a página de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'login.html'));
});

// Rota para a página de cadastro
router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'cadastro.html'));
});

// Rota para a página de informações sobre o site
router.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'sobre.html'));
});

// Rota para a página de espaços cadastrados
router.get('/espacos', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'espacos.html'));
});

// --------- Rotas de API ---------

// Rota de cadastro de usuário (POST)
router.post('/cadastro', usuarioController.cadastrar);

// Rota de login de usuário (POST)
router.post('/login', usuarioController.login);

// Rota para verificar se o email já está cadastrado (POST)
router.post('/verificar-email', usuarioController.verificarEmail);

// Rota para verificar autenticação do usuário
router.get('/verificar-autenticacao', verificarAutenticacao, (req, res) => {
    res.json({ autenticado: true }); // Responde que o usuário está autenticado
});

// Rota de API para listar todos os espaços
router.get('/api/listarEspacos', espacoController.listarEspacos);

// Rota de logout do usuário (GET)
router.get('/logout', (req, res) => {
    res.clearCookie('usuarioId'); // Remove o cookie
    res.status(200).json({ message: 'Logout realizado com sucesso.' });
});

// --------- Rotas Privadas (que exigem autenticação) ---------

// Rota para acessar o perfil do usuário
router.get('/meu-perfil', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'perfil.html'));
});

// Rota de API para mostrar o perfil do usuário (requere autenticação)
router.get('/api/mostrarPerfil', verificarAutenticacao, usuarioController.mostrarPerfil);

// Rota de api que faz atualizar o perfil
router.put('/api/atualizarPerfil',verificarAutenticacao, usuarioController.atualizarPerfil);


// --------- Página Inicial ---------

// Rota para a página inicial (requer autenticação)
router.get('/', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'index.html'));
});

module.exports = router;
