const {Model, DataTypes} = require('sequelize');

class Exercicio extends Model{
    // Faz a conexao com o banco de dados
    static init(sequelize) {
        super.init(
            // Os campos da tabela
            {
                descricao: DataTypes.STRING,
                xp: DataTypes.INTEGER,
                tipoExercicio: DataTypes.STRING // olhos ou corpo

            }, 
            {   // O sequelize para a conexao 
                sequelize
            }
        )
    }

    static associate(models) {
          
    }
}
module.exports = Exercicio;