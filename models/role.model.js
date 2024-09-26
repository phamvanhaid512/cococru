const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Role',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            index:{
                type:DataTypes.INTEGER
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
            tableName: 'Role',
            autoIncrement: true, // Tự động tạo auto-increment ID
            autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
        }
    );
    Model.associate = function (models) {
        Model.belongsToMany(models.User, {
            through: 'UserRole',
            foreignKey: 'role_id',
            other_key: 'user_id',
            as: 'user',
            attributes: []
        });
        Model.hasMany(models.Minigame, { foreignKey: 'roleId', as: 'role' });
    }
    return Model;
}