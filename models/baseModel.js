module.exports = (sequelize, DataTypes) => {
  const Base = sequelize.define("base_model", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    risk: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    high_risk: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });
  return Base;
};
