module.exports = (sequelize, DataTypes) => {
  const UserAdmin = sequelize.define("userAdmin", {
    ua_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Table name in the database
        key: "user_id",
      },
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "admins", // Table name in the database
        key: "admin_id",
      },
    },
  });

  UserAdmin.associate = (models) => {
    UserAdmin.belongsTo(models.user, { foreignKey: "user_id" });
    UserAdmin.belongsTo(models.admin, { foreignKey: "admin_id" });
  };

  return UserAdmin;
};
