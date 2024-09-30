const express = require('express');
const path = require('path'); // Adicionar importação do path
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'index.html'));
});

module.exports = router
