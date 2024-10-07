const express = require('express');
const path = require('path'); // Adicionar importação do path
const router = express.Router();
const espacoController = require('../controllers/espacoController.js');
const usuarioController = require('../controllers/usuarioController.js');


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

router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'cadastro.html'));
});

router.post('/cadastro', usuarioController.cadastrar)

router.post('/verificar-email', usuarioController.verificarEmail);

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'login.html'));
});

router.post('/login', usuarioController.login);

module.exports = router
