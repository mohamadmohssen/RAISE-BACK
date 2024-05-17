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
      //the full name of the baby
      type: DataTypes.STRING,
    },
    mother_name: {
      type: DataTypes.STRING,
    },
    DOB: {
      //get the day, month and year only
      type: DataTypes.DATEONLY,
    },
    age: {
      type: DataTypes.INTEGER,
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
  });
  return User;
};
