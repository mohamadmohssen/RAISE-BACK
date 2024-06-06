module.exports = (sequelize, DataTypes) => {
  const MG = sequelize.define("mg_model", {
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
  return MG;
};
