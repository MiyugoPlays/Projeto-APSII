const express = require('express');
const path = require('path');
const router = express.Router();
const espacoController = require('../controllers/espacoController.js');
const usuarioController = require('../controllers/usuarioController.js');

// Middleware de verificação de autenticação
const verificarAutenticacao = (req, res, next) => {
    const { usuarioId } = req.cookies; // Lê o cookie

    if (!usuarioId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    // Se necessário, você pode verificar o ID do usuário no banco de dados aqui

    next(); // Chama o próximo middleware ou rota
};

// Rotas que não precisam de autenticação
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'login.html'));
});

router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'cadastro.html'));
});

router.post('/cadastro', usuarioController.cadastrar);
router.post('/verificar-email', usuarioController.verificarEmail);
router.post('/login', usuarioController.login);

// Rota para verificar autenticação
router.get('/verificar-autenticacao', verificarAutenticacao, (req, res) => {
    res.json({ autenticado: true }); // Responde que o usuário está autenticado
});

router.get('/logout', (req, res) => {
    res.clearCookie('usuarioId'); // Remove o cookie
    res.status(200).json({ message: 'Logout realizado com sucesso.' });
});

// Rotas que precisam de autenticação
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'index.html'));
});

router.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'sobre.html'));
});

router.get('/espacos/lista', espacoController.listarEspacos);

router.get('/espacos', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'espacos.html'));
});

module.exports = router;
