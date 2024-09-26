const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    'GameCard',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      questionCard: {
        type: DataTypes.TEXT
      },
      minigameId: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'gameCard',
      autoIncrement: true, // Tự động tạo auto-increment ID
      autoIncrementIdentity: '1,1' // Cấu hình auto_increment_increment và auto_increment_offset
    }
  );
  sequelize.sync()
    .then(() => {
      console.log("Table 'gameCards' has been created.");
    })
    .catch((error) => {
      console.error("Error creating 'gameCards' table:", error);
    });
  Model.associate = function (models) {
    Model.hasMany(models.Card, { foreignKey: 'gameCardId', as: 'gameCard' });
    Model.belongsTo(models.Minigame, { foreignKey: 'minigameId', as: 'minigameCards' });
  }

  return Model;
};
