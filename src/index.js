const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const routes = require('./routes/routes.js'); // Importar as rotas
const db = require('./db.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());
// Se você precisar lidar com dados URL-encoded (como formulários HTML):
app.use(express.urlencoded({ extended: true }));

// Usar as rotas
app.use('/', routes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
