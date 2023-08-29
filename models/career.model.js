const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define(
        'Career',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
            },
            logo: { 
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            } 

        },
        {
            tableName: 'career'
        }
    );
    Model.associate = function(models) {
        // Model.belongsToMany(models.Career,{through: 'UserCareer',as: 'relaUserCareer'});
        Model.belongsToMany(models.User,{through: 'UserCareer',as: 'relaCareerUser'});
        Model.hasMany(models.Task,{foreignKey: 'careerId',as: 'career'});
    
    }

    return Model;
}