const db = require("../models");
const User = db.user;
const Question = db.question;
const UserQuestion = db.userQuestion;

// Function to save or update user's answers
const saveUserAnswers = async (req, res) => {
  const { userId, answers } = req.body;

  if (!userId || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const promises = answers.map(async (answerObj) => {
      const { questionId, answer, testCounter } = answerObj;

      if (!questionId || (answer !== 0 && answer !== 1) || !testCounter) {
        throw new Error("Invalid answer data");
      }

      const existingEntry = await UserQuestion.findOne({
        where: { user_id: userId, question_id: questionId },
      });

      if (existingEntry) {
        return UserQuestion.update(
          { answer, test_counter: testCounter },
          { where: { user_id: userId, question_id: questionId } }
        );
      } else {
        return UserQuestion.create({
          user_id: userId,
          question_id: questionId,
          answer,
          test_counter: testCounter,
        });
      }
    });

    await Promise.all(promises);

    res.status(200).json({ message: "User answers saved successfully." });
  } catch (error) {
    console.error("Error saving user answers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get all answers from a user
const getUserAnswers = async (req, res) => {
  const { userId } = req.params;

  try {
    const userAnswers = await UserQuestion.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Question,
          attributes: [
            "question_id",
            "question_english",
            "question_arabic",
            "type",
            "is_important",
            "category",
          ],
        },
      ],
    });

    res.status(200).json(userAnswers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get a specific user's answer for a question
const getUserAnswerForQuestion = async (req, res) => {
  const { userId, questionId } = req.params;

  try {
    const userAnswer = await UserQuestion.findOne({
      where: { user_id: userId, question_id: questionId },
      include: [
        {
          model: Question,
          attributes: [
            "question_id",
            "question_english",
            "question_arabic",
            "type",
            "is_important",
            "category",
          ],
        },
      ],
    });

    if (userAnswer) {
      res.status(200).json(userAnswer);
    } else {
      res.status(404).json({ message: "Answer not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to delete a user's answer for a question
const deleteUserAnswer = async (req, res) => {
  const { userId, questionId } = req.body;

  try {
    const connection = await UserQuestion.findOne({
      where: {
        user_id: userId,
        question_id: questionId,
      },
    });

    if (!connection) {
      return res.status(404).json({ message: "Answer not found." });
    }

    await connection.destroy();
    res.status(200).json({ message: "Answer deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  saveUserAnswers,
  getUserAnswers,
  getUserAnswerForQuestion,
  deleteUserAnswer,
};
