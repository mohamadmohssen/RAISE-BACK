const questionController = require("../controllers/questionController.js");

const router = require("express").Router();

router.post("/addQuestion", questionController.addQuestion);
router.get("/getAllQuestions", questionController.getAllQuestions);
router.get("/getActiveQuestions", questionController.getActiveQuestions);
router.get("/getDeletedQuestions", questionController.getDeletedQuestions);
router.get("/getImportantQuestions", questionController.getImportantQuestions);
router.get("/getOneQuestion/:id", questionController.getOneQuestion);
router.put("/editQuestion/:id", questionController.editQuestion);
router.put("/publishQuestion/:id", questionController.publishQuestion);
router.delete("/deleteQuestion/:id", questionController.deleteQuestion);

module.exports = router;
