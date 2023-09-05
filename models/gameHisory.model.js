const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define(
        'GameHistory',
        {
            
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            enegy: {
                type: DataTypes.INTEGER
            },
            stars: { 
                type: DataTypes.INTEGER
            },
            coin: {
                type: DataTypes.INTEGER
            }
            ,userId:{
                type:DataTypes.INTEGER
            }
        },
        {
            tableName: 'gameHistory'
        }
    );
    Model.associate = function(models) {  
        Model.belongsTo(models.User,{foreignKey: 'userId',as: 'history'});
    }

    return Model;
}