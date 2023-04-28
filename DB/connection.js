const {Sequelize} = require ('sequelize');
const dotenv  = require ( 'dotenv');
dotenv.config();

const sequelize = new Sequelize("violation_db", "root", "shahd!A2002", {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports= sequelize;