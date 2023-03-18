module.exports = (sequelize, DataTypes, Model) => {
  class Accidents extends Model {}

  Accidents.init(
    {
      // Model attributes are defined here
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      accident_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      accident_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expw_step: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weather_state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      injur_man: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      injur_femel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dead_man: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dead_femel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cause: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
      sequelize,
      modelName: "accidents",
    }
  );

  return Accidents;
};
