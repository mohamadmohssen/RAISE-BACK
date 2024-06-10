const express = require("express");
const router = express.Router();
const userAdminController = require("../controllers/userAdminController");

router.post("/takepatient", userAdminController.takeUser);
router.get("/getAdminUsers", userAdminController.getAllAdminUserConnections);
router.post("/deleteAdminUser", userAdminController.deleteUserAdminConnection);
router.get("/usersOfAdmin/:adminId", userAdminController.getUsersByAdmin);
router.get("/adminsOfUsers/:userId", userAdminController.getAdminsByUser);

module.exports = router;
