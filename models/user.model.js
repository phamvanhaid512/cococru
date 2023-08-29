const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            fullname: {
                type: DataTypes.STRING,

            },
            gender: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            nickName: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            tableName: 'User'
        }
    );
    Model.associate = function (models) {
        Model.belongsToMany(models.Career, { through: 'UserCareer', as: 'relaUserCareer' });
        // Model.belongsToMany(models.User,{through: 'UserCareer',as: 'relaCareerUser'});
        Model.hasMany(models.GameHistory, { foreignKey: 'userId', as: 'history' });


    }
    return Model;
}