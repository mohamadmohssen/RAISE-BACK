const db = require("../models");

// model
const Question = db.question;

const addQuestion = async (req, res) => {
  try {
    let questionInfo = {
      question_english: req.body.question_english,
      question_arabic: req.body.question_arabic,
      type: req.body.type,
      is_important: req.body.is_important,
      flag: 0,
      category: req.body.category,
    };

    const question = await Question.create(questionInfo);
    console.log(question);
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const editQuestion = async (req, res) => {
  const questionId = req.params.id;
  const {
    question_english,
    question_arabic,
    type,
    is_important,
    flag,
    category,
  } = req.body;

  try {
    const [updated] = await Question.update(
      {
        question_english,
        question_arabic,
        type,
        is_important,
        flag,
        category,
      },
      {
        where: { question_id: questionId },
      }
    );

    if (updated) {
      const updatedQuestion = await Question.findOne({
        where: { question_id: questionId },
      });
      res.status(200).json({
        message: "Question updated successfully",
        question: updatedQuestion,
      });
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteQuestion = async (req, res) => {
  const questionId = req.params.id;

  try {
    const [updated] = await Question.update(
      { flag: true },
      { where: { question_id: questionId } }
    );

    if (updated) {
      const updatedQuestion = await Question.findOne({
        where: { question_id: questionId },
      });
      res.status(200).json({
        message: "Question flagged as deleted",
        question: updatedQuestion,
      });
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const publishQuestion = async (req, res) => {
  const { id } = req.params;
  const { flag } = req.body;

  try {
    const question = await Question.findByPk(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.flag = flag;
    await question.save();

    return res
      .status(200)
      .json({ message: "Question flag updated successfully" });
  } catch (error) {
    console.error("Error updating question flag:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({});
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getActiveQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: { flag: false },
    });
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getOneQuestion = async (req, res) => {
  const id = req.params.id;
  const question = await Question.findOne({ where: { question_id: id } });
  res.status(200).send(question);
};
const getDeletedQuestions = async (req, res) => {
  try {
    const deletedQuestions = await Question.findAll({
      where: { flag: true },
    });
    res.status(200).json(deletedQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getImportantQuestions = async (req, res) => {
  try {
    const importantQuestions = await Question.findAll({
      where: { is_important: 1 },
    });
    res.status(200).json(importantQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addQuestion,
  editQuestion,
  deleteQuestion,
  getAllQuestions,
  getActiveQuestions,
  getOneQuestion,
  getDeletedQuestions,
  getImportantQuestions,
  publishQuestion,
};
