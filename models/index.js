
const Sequelize = require("sequelize");
const CONFIG  = require('../config/config')
const sequelize = new Sequelize(
    CONFIG.db_name,
    CONFIG.db_user, CONFIG.db_password,
  {
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
    port: CONFIG.db_port,
    operatorsAliases: false,
    dialectOptions: {
        // useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true,
        timezone: '+07:00'
    },
    timezone: '+07:00', //for writing to database
    logging: false
  }
);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});
module.exports = {sequelize}