const {Model, DataTypes} = require('sequelize');

// Model para a tabela do relacionamento n:n entre Exercicio e Usuario.
// Criei esse model porque nao estava conseguindo passar o intervalo da seguinte forma: 
// await usuario.addExercicio(exercicio, {through: {intervalo: 30} }).
// Esta assim na doc: https://sequelize.org/master/manual/advanced-many-to-many.html.
// Porem nao passa o intervalo, ele vai como null no insert
class Ciclo extends Model{
    // Faz a conexao com o banco de dados
    static init(sequelize) {
        super.init(
            // Os campos da tabela
            {
                usuario_id: DataTypes.INTEGER,
                exercicio_id: DataTypes.INTEGER,
                intervalo: DataTypes.INTEGER 

            }, 
            {   // O sequelize para a conexao 
                sequelize,
                tableName: 'ciclos'
            }
        )
    }

    static associate(models) {
      
    }
}
module.exports = Ciclo;