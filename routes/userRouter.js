// import controllers review, products
const userController = require("../controllers/userController.js");

// router
const router = require("express").Router();

router.post("/addUser", userController.addUser);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/takedUsers", userController.getTakedUsers);
router.post("/updateResult", userController.updateUserResult);
router.post("/updateResultsByType", userController.updateUserResultsByType);
router.get("/phone/:phoneNumber1", userController.getUserByPhoneNumber1);
router.put("/take/:userId", userController.updateUserToTaken);
router.get("/getpatient/:userId", userController.getUserById);
router.post("/finish/:userId", userController.setUserFinished);

module.exports = router;
