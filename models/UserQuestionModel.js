module.exports = (sequelize, DataTypes) => {
  const UserQuestion = sequelize.define("user_question", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Table name
        key: "user_id",
      },
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "questions", // Table name
        key: "question_id",
      },
    },
    answer: {
      type: DataTypes.BOOLEAN,
    },
    test_counter: {
      type: DataTypes.INTEGER,
    },
  });

  return UserQuestion;
};
