const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require('./index.js')
const CategoryModule = sequelize.define("categories", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
});

CategoryModule.sync()
    .then(() => {
        console.log('Category table created successfully!');
    })
    .catch((error) => {
        console.error('Unable to create table: ', error);
    });

module.exports = QuestionsModule;