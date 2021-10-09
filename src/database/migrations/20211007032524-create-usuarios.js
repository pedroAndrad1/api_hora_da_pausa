'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("usuarios",{
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      senha:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_logged:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      nivel:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      xp:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      xp_para_subir_de_nivel:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      foto:{
        type: Sequelize.BLOB('long'),
        allowNull: true
      },
      doador:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      quant_exercicios_feitos:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios');

  }
};
