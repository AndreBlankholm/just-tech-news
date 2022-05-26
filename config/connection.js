//import the Sqeuelize construtor from the nod library

const Sequelize = require('sequelize');

require('dotenv').config();

// create a (CALL) connection to my database, pass in your MySQL information for username and password

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,  {
    host: 'localhost',    //sql configure settings
    dialect: 'mysql',
    port: 3306
});


module.exports = sequelize;
