'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Treatment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Treatment.belongsTo(models.Patient,{as:'patients',foreignKey:'patientId'})
      Treatment.belongsTo(models.Patient,{as:'patients',foreignKey:'patientId'})
      Treatment.belongsTo(models.User,{as:'doctors',foreignKey:'doctorId'});
      Treatment.hasMany(models.Cashier,{as:'cashiers',foreignKey:'treatmentId'})

    }
  }
  Treatment.init({
    treatmentName: DataTypes.STRING,
    patientId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    roomNo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Treatment',
  });
  return Treatment;
};