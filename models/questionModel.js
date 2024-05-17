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
      //type here is (SO,MG... |(for every question))
      type: DataTypes.STRING,
    },
    is_important: {
      type: DataTypes.BOOLEAN,
    },
    flag: {
      //flag here is 0 when the question appears but it turns 1 when deleting it bcz when reviewing old people's answers don't have an error
      type: DataTypes.BOOLEAN,
    },
    category: {
      //category means (AP,A,B...(for every group of questions))
      type: DataTypes.STRING,
    },
  });
  return Question;
};
