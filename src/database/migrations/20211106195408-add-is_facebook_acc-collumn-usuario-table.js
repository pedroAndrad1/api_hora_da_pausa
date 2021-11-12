'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'usuarios',
      'is_facebook_acc',
      {
        type: Sequelize.BOOLEAN
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'usuarios',
      'is_facebook_acc'
    );
  }
};
