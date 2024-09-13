'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Animes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      episodes: {
        type: Sequelize.INTEGER,
      },
      studio: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      language: {
        type: Sequelize.STRING,
      },
      releaseDate: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM('ongoing', 'completed'),
      },
      rating: {
        type: Sequelize.FLOAT,
      },
      synopsis: {
        type: Sequelize.TEXT,
      },
      link: {
        type: Sequelize.STRING,
      },
      director: {
        type: Sequelize.STRING,
      },
      season: {
        type: Sequelize.INTEGER,
      },
      has_manga: {
        type: Sequelize.BOOLEAN,
      },
      age_rating: {
        type: Sequelize.STRING,
      },
      network: {
        type: Sequelize.STRING,
      },
      airing_time: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Animes');
  }
};