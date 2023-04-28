const { DataTypes,Model } = require('sequelize');
// const sequelize = require('sequelize');
const sequelize =require ("../connection");
const car = require('../model/car')
const officer = require('../model/officer')

class Violation extends Model {}

Violation.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  carId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: car,
        key: 'id',
      },
  },
  officerId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: officer,
        key: 'id',
      },
  },
  reasonOfViolation: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  valueOfViolation: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  carColor: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  carType: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  
 
}, {
  sequelize,
  timestamps: true,
  modelName: 'Violation',
});

module.exports = Violation;
