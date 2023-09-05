// const Sequelize = require("sequelize");
// const CONFIG = require('../config/config');
// const sequelize = new Sequelize(
//    CONFIG.db_name,
//    CONFIG.db_user, CONFIG.db_password,
//    {
//       operatorsAliases: 0, // change this to zero

//       host: CONFIG.db_host,
//       dialect: CONFIG.db_dialect,
//       port: CONFIG.db_port,
//       operatorsAliases: false,
//       dialectOptions: {
//          // useUTC: false, //for reading from database
//          dateStrings: true,
//          typeCast: true,
//          timezone: '+07:00'
//       },
//       timezone: '+07:00', //for writing to database
//       logging: false
//    }
// );
// const User = require('./UserModel');
// const Career = require('./CareerModel');
// const Task = require('./TaskModel');
// const Minigame = require('./MinigameModel');
// sequelize.authenticate().then(() => {
//    console.log('Connection has been established successfully.');
// }).catch((error) => {
//    console.error('Unable to connect to the database: ', error);
// });

// module.exports = { sequelize }
'use strict';
const CONFIG = require('../config/config');
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var db = {};
console.log('CONFIG---', CONFIG);
const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
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
});

fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach((file) => {
        var model = require(path.join(__dirname, file))(sequelize, Sequelize);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
