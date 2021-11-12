const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class Usuario extends Model {
    //Faz a conexao com o banco de dados
    static init(sequelize) {
        super.init(
            //Os campos da tabela
            {
                nome: DataTypes.STRING,
                senha: DataTypes.STRING,
                email: DataTypes.STRING,
                is_logged: DataTypes.BOOLEAN,
                nivel: DataTypes.INTEGER,
                xp: DataTypes.INTEGER,
                xp_para_subir_de_nivel: DataTypes.INTEGER,
                foto: DataTypes.BLOB,
                doador: DataTypes.BOOLEAN,
                quant_exercicios_feitos: DataTypes.INTEGER,
                id_doacao_pendente: DataTypes.STRING,
                is_facebook_acc: DataTypes.BOOLEAN,
                facebook_foto_url: DataTypes.STRING,

            }, 
            {   //O sequelize para a conexao 
                sequelize,
                // Metodos que para executar operacoes no registro na criacao.
                // Neste caso, esta hasheando o password antes de criar o registro
                hooks: {
                    beforeCreate: (usuario) => {
                        const salt = bcrypt.genSaltSync();
                        usuario.senha = bcrypt.hashSync(usuario.senha, salt);
                    },
                },
                tableName:'usuarios'
            }
        )
    }

    static associate(models) {
        this.belongsToMany(models.Exercicio, { foreignKey: 'exercicio_id', through: 'ciclos'})
    }

}

module.exports = Usuario;