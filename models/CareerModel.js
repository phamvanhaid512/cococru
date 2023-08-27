const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require('./index.js')
const CareerModule = sequelize.define("careers", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    logo: { 
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    } 
});

CareerModule.sync()
    .then(() => {
        console.log('Career table created successfully!');
    })
    .catch((error) => {
        console.error('Unable to create table: ', error);
    });

module.exports = CareerModule;