module.exports = (sequelize, DataTypes) => {
  const UserAdmin = sequelize.define("user_admin", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return UserAdmin;
};
