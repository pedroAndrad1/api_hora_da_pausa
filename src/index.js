
const express = require('express');
const app = express();
const UsuarioRoutes = require('./routes/UsuarioRoutes');
// Chamando a conexao com o banco de dados
// isso executa tudo que esta em './database/index'
require('./database');

// Define que as respostas das requisicoes vao ser no formato json
app.use(express.json());

// Definindo as rotas
app.use(UsuarioRoutes);

app.get("/", (req, res) => {
    res.send("api_hora_da_pausa funcionando!")
})
app.listen(3333);