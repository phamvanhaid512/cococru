const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define(
        'Task',
        {
            name: {
                type: DataTypes.STRING
            },
            logo: {
                type: DataTypes.STRING
            },
            type: {
                type: DataTypes.INTEGER
            },
            description: {
                type: DataTypes.STRING
            },
            timeStart: {
                type: DataTypes.INTEGER
            },
            coin: {
                type: DataTypes.INTEGER
            },
            enegy_lost: {
                type: DataTypes.INTEGER
            },
            enegy_get: {
                type: DataTypes.INTEGER
            },
            careerId: {
                type: DataTypes.INTEGER,
            }
        },
        {
            tableName: 'tasks',
            autoIncrement: true, // Tự động tạo auto-increment ID
            autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
        }
    );
    sequelize.sync()
        .then(() => {
            console.log("Table 'tasks' has been created.");
        })
        .catch((error) => {
            console.error("Error creating 'tasks' table:", error);
        });
    Model.associate = function (models) {
        Model.belongsTo(models.Career, { foreignKey: 'careerId', as: 'task' });
        Model.hasMany(models.Question, { foreignKey: 'taskId', as: 'taskQuestion' });
        Model.belongsToMany(models.User, {
            through: 'UserTask',
            foreignKey: 'task_id',
            other_key: 'user_id',
            as: 'user',
            attributes: []
        });

    }
    return Model;
};
