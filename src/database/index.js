// Inicia as conexoes com o banco

const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuario');
const Exercicio = require('../models/Exercicio');
const Ciclo = require('../models/Ciclo');

// Criando uma conexao com o banco
const connection = new Sequelize(dbConfig);
// Iniciando a conexao dos models com o banco
Usuario.init(connection);
Exercicio.init(connection);
Ciclo.init(connection);
// Associando as tabelas entre si
Usuario.associate(connection.models)
Exercicio.associate(connection.models);

module.exports = connection;