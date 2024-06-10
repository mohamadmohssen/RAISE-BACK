// import controllers review, products
const userController = require("../controllers/userController.js");

// router
const router = require("express").Router();

router.post("/addUser", userController.addUser);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/takedUsers", userController.getTakedUsers);
router.get("/phone/:phoneNumber1", userController.getUserByPhoneNumber1);
router.put("/take/:userId", userController.updateUserToTaken);
router.get("/getpatient/:userId", userController.getUserById);

module.exports = router;
