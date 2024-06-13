const db = require("../models");
const User = db.user;
const Question = db.question;
const UserQuestion = db.userQuestion;

// Function to save or update user's answers
const saveUserAnswers = async (req, res) => {
  const { userId, answers } = req.body;

  if (
    !Array.isArray(answers) ||
    !answers.every(
      (answer) =>
        typeof answer.questionId === "number" &&
        typeof answer.answer === "boolean" &&
        typeof answer.testCounter === "number" // Ensure testCounter is also checked
    )
  ) {
    console.error("Invalid data format:", answers);
    return res.status(400).json({ error: "Invalid answer data" });
  }

  try {
    //before for loop check the last record of the userid and tst counter
    for (const { questionId, answer, testCounter } of answers) {
      console.log(
        `Processing answer for question ${questionId} with testCounter ${testCounter}`
      ); // Debug log

      const existingAnswer = await UserQuestion.findOne({
        where: {
          user_id: userId,
          question_id: questionId,
        },
      });

      if (existingAnswer) {
        await existingAnswer.update({
          answer,
          test_counter: testCounter,
        });
        console.log(
          `Updated answer for question ${questionId} with testCounter ${testCounter}`
        );
      } else {
        await UserQuestion.create({
          user_id: userId,
          question_id: questionId,
          answer,
          test_counter: testCounter,
        });
        console.log(
          `Saved new answer for question ${questionId} with testCounter ${testCounter}`
        );
      }
    }

    res.status(200).json({ message: "Answers saved or updated successfully." });
  } catch (error) {
    console.error("Error saving answers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Function to get all answers from a user
const getUserAnswers = async (req, res) => {
  const userId = req.params.userId;
  try {
    const userAnswers = await UserQuestion.findAll({
      where: { user_id: userId },
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

const calculateImportantYesAnswers = async (req, res) => {
  const { userId } = req.params;

  try {
    // Get all important questions
    const importantQuestions = await Question.findAll({
      where: { is_important: true },
    });

    // Extract question IDs
    const importantQuestionIds = importantQuestions.map((q) => q.question_id);

    // Count the "Yes" answers for the important questions
    const yesAnswersCount = await UserQuestion.count({
      where: {
        user_id: userId,
        question_id: importantQuestionIds,
        answer: true,
      },
    });

    res.status(200).json({ yesAnswersCount });
  } catch (error) {
    console.error("Error calculating important 'Yes' answers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  saveUserAnswers,
  getUserAnswers,
  getUserAnswerForQuestion,
  deleteUserAnswer,
  calculateImportantYesAnswers,
};
