const Sequelize = require("sequelize");
import { User, Career } from "./index.js";
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define(
        'UserTask',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            task_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            }
        },
        {
            tableName: 'UserTask',
            autoIncrement: true, // Tự động tạo auto-increment ID
            autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
        }
    );
    Model.associate = function (models) {
        Model.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        Model.belongsTo(models.Task, { foreignKey: 'task_id', as: 'task' });
    };
    return Model;
}