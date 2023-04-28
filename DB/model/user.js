const { DataTypes,Model  } = require('sequelize');
// const sequelize = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize =require ("../connection");

class User extends Model {}

User.init({
  username: { 
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'User',
});

module.exports = User;
