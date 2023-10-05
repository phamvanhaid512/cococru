const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Career',
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
            tableName: 'career',
            autoIncrement: true, // Tự động tạo auto-increment ID
            autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
        }
    );
    Model.associate = function (models) {
        Model.belongsToMany(models.User, {
            through: 'UserCareer',
            foreignKey: 'career_id',
            other_key: 'user_id',
            as: 'user',
            attributes: []
        });
        Model.hasMany(models.Task, { foreignKey: 'careerId', as: 'career' });
    }
    return Model;
}