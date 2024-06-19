module.exports = (sequelize, DataTypes) => {
  const Base = sequelize.define("base_model", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    risk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    high_risk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Base;
};
