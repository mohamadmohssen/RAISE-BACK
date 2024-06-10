module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phone_number1: {
      type: DataTypes.STRING,
    },
    phone_number2: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    is_taken: {
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
    so_res: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    au_res: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    mg_res: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    mf_res: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lex_res: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lco_res: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    le_res: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    nbre_res: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dg_res: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Question, {
      through: models.UserQuestion,
      foreignKey: "user_id",
    });
  };

  return User;
};
