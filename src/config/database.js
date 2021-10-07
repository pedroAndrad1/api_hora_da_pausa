// Configs para acessar o banco no MySQL
module.exports = {
    host: "localhost",
    dialect: 'mysql',
    username: 'root',
    password: '8016',
    database: 'hora_da_pausa',
    define: {
        // Define que cada registro vai ter dois campos, um que tem a data que ele foi criado
        // e outro  que salva a data da ultima atualizacao.
        timestamps: true, 
        // Define que os que os campos e nomes das tabelas vao usar _ para separar os palavras.
        // Ex: created_at
        underscored: true,
    },
};