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
            tableName: 'UserCareer'
        }
    );
    Model.associate = function (models) {
        Model.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        Model.belongsTo(models.Career, { foreignKey: 'career_id', as: 'career' });
    };
    return Model;
}