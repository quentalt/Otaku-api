'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Anime.init({
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    episodes: DataTypes.INTEGER,
    studio: DataTypes.STRING,
    genre: DataTypes.STRING,
    duration: DataTypes.STRING,
    airing_time: DataTypes.STRING,
    network: DataTypes.STRING,
    age_rating: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    status: DataTypes.ENUM('ongoing', 'completed'),
    rating: DataTypes.FLOAT,
    synopsis: DataTypes.TEXT,
    link: DataTypes.STRING,
    director: DataTypes.STRING,
    season: DataTypes.INTEGER,
    has_manga: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};