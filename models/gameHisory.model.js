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
        enegy_get:{
            type:DataTypes.INTEGER,
            allowNull: true
        },
        enegy_lost:{
            type:DataTypes.INTEGER,
            allowNull: true
        },
      stars_get:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
       coin_get:{
            type: DataTypes.INTEGER,
            allowNull: true

        }
        ,userId: {
            type: DataTypes.INTEGER
        }
    },
        {
            tableName: 'gameHistory',
            autoIncrement: true, // Tự động tạo auto-increment ID
            autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
        }
    );
    Model.associate = function (models) {
        Model.belongsTo(models.User, { foreignKey: 'userId', as: 'history' });
    }
    return Model;
}