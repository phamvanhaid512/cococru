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
                allowNull: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,

            },
            fullname: {
                type: DataTypes.STRING,
                allowNull: true

            },
            gender: {
                type: DataTypes.ENUM('male', 'female', 'other'),
                allowNull: true
            },
            nickName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: true

            },
            stars: {
                type: DataTypes.INTEGER,
                allowNull: true

            },
            coin: {
                type: DataTypes.INTEGER,
                allowNull: true

            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            tableName: 'User'
        }
    );
    Model.associate = function (models) {
        Model.belongsToMany(models.Career, {
            through: 'UserCareer',
            foreignKey: 'user_id',
            otherKey: 'career_id',
            as: 'career',
            attributes: []
        });
        Model.hasMany(models.GameHistory, { foreignKey: 'userId', as: 'history' });
    }
    return Model;
}