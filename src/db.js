// src/database.js
const mysql = require('mysql2/promise');

// Configuração da conexão
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'usbw',
    database: 'db_salle',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Função para testar a conexão
const testarConexao = async () => {
    try {
        const [rows] = await connection.query('SELECT 1');
        console.log('Conexão ao MySQL estabelecida com sucesso.');
    } catch (err) {
        console.error('Erro ao conectar ao MySQL: ' + err.message);
    }
};

// Testa a conexão
testarConexao();

module.exports = connection;