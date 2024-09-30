const express = require('express');
const path = require('path'); // Adicionar importação do path
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'index.html'));
});

router.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'sobre.html'));
});

router.get('/espacos', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'espacos.html'));
});

router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'cadastro.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'login.html'));
});

module.exports = router
