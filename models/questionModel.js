module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("question", {
    question_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question_english: {
      type: DataTypes.STRING,
    },
    question_arabic: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    is_important: {
      type: DataTypes.BOOLEAN,
    },
    flag: {
      type: DataTypes.BOOLEAN,
    },
    category: {
      type: DataTypes.STRING,
    },
  });

  Question.associate = (models) => {
    Question.belongsToMany(models.User, {
      through: models.UserQuestion,
      foreignKey: "question_id",
    });
  };

  return Question;
};
