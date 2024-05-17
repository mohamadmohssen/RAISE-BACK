module.exports = (sequelize, DataTypes) => {
  const UserQuestion = sequelize.define("user_question", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
