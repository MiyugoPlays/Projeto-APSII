<h1>Instruções para rodar o projeto</h1>
<p>Para rodar o código é necessario:</p>
<ul>
    <li>Node.Js</li>
    <li>Servidor MySQL</li>
</ul>

<p>Para rodar o server é necessario rodar no Terminal o seguinte comando:</p>

```
npm run dev
```

<h2>OBSERVAÇÃO</h2>

Provavelmente para rodar corretamente o projeto, vai ser necessário mudar a conexão do banco de dados, para isso basta acessar o src/db.js e mudar os seguintes campos:
```
const connection = mysql.createPool({
    host: 'NOME_DO_SERVIDOR_LOCAL',
    user: 'NOME_DO_USUARIO_DO_SERVER_DO_DB',
    password: 'SENHA_DO_SERVER_DO_DB',
    database: 'NOME_DO_DB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
```
