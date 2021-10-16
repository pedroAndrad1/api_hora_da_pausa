
const express = require('express');
const app = express();
var cors = require('cors');
const UsuarioRoutes = require('./routes/UsuarioRoutes');
const ExercicioRoutes = require('./routes/ExercicioRoutes');
// Chamando a conexao com o banco de dados
// isso executa tudo que esta em './database/index'
require('./database');

// Define que as respostas das requisicoes vao ser no formato json
app.use(express.json());
// Configurando CORS
app.use(cors());
// Definindo as rotas
app.use(UsuarioRoutes);
app.use(ExercicioRoutes);

app.get("/", (req, res) => {
    res.send("api_hora_da_pausa funcionando!")
})
app.listen(3333);