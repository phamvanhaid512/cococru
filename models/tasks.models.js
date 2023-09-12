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
                type: DataTypes.STRING
            },
            careerId: {
                type: DataTypes.INTEGER,
            }
        },
        {
            tableName: 'tasks'
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
    }
    return Model;
};
