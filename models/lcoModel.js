module.exports = (sequelize, DataTypes) => {
  const LCO = sequelize.define("lco_model", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return LCO;
};
