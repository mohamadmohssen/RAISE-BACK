module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phone_number1: {
      type: DataTypes.INTEGER,
    },
    phone_number2: {
      type: DataTypes.INTEGER,
    },
    full_name: {
      type: DataTypes.STRING,
    },
    mother_name: {
      type: DataTypes.STRING,
    },
    DOB: {
      type: DataTypes.DATEONLY,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.BOOLEAN,
    },
    val_id: {
      //this is like it identity(hawiye, passport...)
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    is_taken: {
      //is taken means if he is taken by a therapist
      type: DataTypes.BOOLEAN,
    },
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    result: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  return User;
};
