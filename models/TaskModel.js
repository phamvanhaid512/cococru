const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require('./index.js')
const TasksModule = sequelize.define("task", {
    name: {
        type: DataTypes.STRING
    },
    logo:{
        type:DataTypes.STRING
    },
    type:{
        type:DataTypes.STRING
    },
    careerId :{
        type:DataTypes.INTEGER
    }
});
TasksModule.sync()
    .then(() => {
        console.log('Task table created successfully!');
    })
    .catch((error) => {
        console.error('Unable to create table: ', error);
    });

module.exports = QuestionsModule;