module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("admin", {
    admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.INTEGER,
    },
    is_accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  });

  Admin.associate = (models) => {
    Admin.belongsToMany(models.user, {
      through: models.userAdmin,
      foreignKey: "admin_id",
    });
  };

  return Admin;
};
