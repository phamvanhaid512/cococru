const Sequelize = require("sequelize");
import { User, Career } from "./index.js";
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define(
        'UserCareer',
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
            career_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            }
        },
        {
            tableName: 'UserCareer',
            autoIncrement: true, // Tự động tạo auto-increment ID
            autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
        }
    );
    Model.associate = function (models) {
        Model.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        Model.belongsTo(models.Career, { foreignKey: 'career_id', as: 'career' });
    };
    return Model;
}