'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Mangas', 'age_rating', {
          type: Sequelize.STRING,
          allowNull: true,
        });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Mangas', 'age_rating');
  }
};
