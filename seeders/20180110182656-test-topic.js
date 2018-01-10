'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Topics', [{
      title: 'Introductions',
      description: 'Please introduce yourself before posting elsewhere',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Topics', null, {});
  }
};
