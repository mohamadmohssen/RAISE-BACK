const express = require("express");
const router = express.Router();
const userQuestionController = require("../controllers/userQuestionController");

// Save or update user's answers
router.post("/answers", userQuestionController.saveUserAnswers);

// Get all answers from a user
router.get(
  "/answers/:userId/:testCounter",
  userQuestionController.getUserAnswers
);

// Get a specific user's answer for a question
router.get(
  "/answer/:userId/:questionId",
  userQuestionController.getUserAnswerForQuestion
);

// Delete a user's answer for a question
router.delete("/answer", userQuestionController.deleteUserAnswer);
router.get(
  "/calculateImportantYesAnswers/:userId",
  userQuestionController.calculateImportantYesAnswers
);

module.exports = router;
