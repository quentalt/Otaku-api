'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Manga.init({
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    chapters: DataTypes.INTEGER,
    illustrator: DataTypes.STRING,
    volume_count: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    age_rating: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    status: DataTypes.ENUM('ongoing', 'completed'),
    cover: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    link: DataTypes.STRING,
    rating : DataTypes.FLOAT,
    has_anime: DataTypes.BOOLEAN,
    demographic: DataTypes.STRING,
    serialization: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Manga',
  });
  return Manga;
};