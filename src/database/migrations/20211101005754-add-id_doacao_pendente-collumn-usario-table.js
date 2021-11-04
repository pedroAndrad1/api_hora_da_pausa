'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'usuarios',
      'id_doacao_pendente',
      {
        type: Sequelize.STRING
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'usuarios',
      'id_doacao_pendente',
      {
        type: Sequelize.STRING
      }
    );
  }
};
