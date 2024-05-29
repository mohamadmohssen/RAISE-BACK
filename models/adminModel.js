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
      type: DataTypes.INTEGER,
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
  });
  return Admin;
};
