const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define(
        'UserRole',
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
            role_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            level:{
                type:DataTypes.INTEGER
            }
        },
        {
            tableName: 'UserRole',
            autoIncrement: true, // Tự động tạo auto-increment ID
            autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
        }
    );
    Model.associate = function (models) {
        Model.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        Model.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
    };
    return Model;
}