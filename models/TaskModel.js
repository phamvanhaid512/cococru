const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require('./index.js');
const CareerModule = require("./CareerModel.js");
const TasksModule = sequelize.define("tasks", {
    name: {
        type: DataTypes.STRING
    },
    logo: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
    careerId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'careers', // Tên bảng liên quan
            key: 'id' // Khóa chính của bảng liên quan
        }
    }
});
TasksModule.belongsTo(CareerModule, { foreignKey: "careerId", as: "relaTask" });
CareerModule.hasMany(TasksModule, { foreignKey: "careerId", as: "relaCareer" });
TasksModule.sync()
    .then(() => {
        console.log('Task table created successfully!');
    })
    .catch((error) => {
        console.error('Unable to create table: ', error);
    });

module.exports = TasksModule