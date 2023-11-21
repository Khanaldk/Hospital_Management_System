'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hospital.hasMany(models.Cashier,{as:'cashiers',foreignKey:'hospitalId'})
    }
  }
  Hospital.init({
    hospitalName: DataTypes.STRING,
    hospitalAddress: DataTypes.STRING,
    fbLink: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hospital',
  });
  return Hospital;
};