// import controllers review, products
const userController = require("../controllers/userController.js");

// router
const router = require("express").Router();

router.post("/addUser", userController.addUser);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/takedUsers", userController.getTakedUsers);

module.exports = router;
