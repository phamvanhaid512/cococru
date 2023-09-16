const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define(
        'GameHistory', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        enegy_spent:{
            type:DataTypes.INTEGER,
            allowNull: true
        },
        end_time:{
            type:DataTypes.DATE,
            allowNull: true
        },
        get_stars:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        get_coin:{
            type: DataTypes.INTEGER,
            allowNull: true

        }
        ,userId: {
            type: DataTypes.INTEGER
        }
    },
        {
            tableName: 'gameHistory'
        }
    );
    Model.associate = function (models) {
        Model.belongsTo(models.User, { foreignKey: 'userId', as: 'history' });
    }
    return Model;
}