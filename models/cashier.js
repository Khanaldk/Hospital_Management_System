'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cashier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cashier.belongsTo(models.Hospital,{as:'hospitals',foreignKey:'hospitalId'})
      Cashier.belongsTo(models.Treatment,{as:'treatments',foreignKey:'treatmentId'})

    }
  }
  Cashier.init({
    hospitalId: DataTypes.INTEGER,
    treatmentId: DataTypes.INTEGER,
    totalCost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cashier',
  });
  return Cashier;
};