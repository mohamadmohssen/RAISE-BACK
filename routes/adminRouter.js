// import controller
const adminController = require("../controllers/adminController.js");

// router
const router = require("express").Router();

// Admin Url and Controller
router.post("/addAdmin", adminController.addAdmin);
router.post("/signup", adminController.signUp);
router.post("/login", adminController.login);
router.get("/admindata", adminController.getAdminData);
router.get("/getAllAdmins", adminController.getAllAdmins);
router.get("/checkUserExists", adminController.checkUserExists);
router.get("/getAllTherapists", adminController.getAllTherapists);
router.get("/getAllUnderSuperAdmin", adminController.getAllUnderSuperAdmin);
router.get("/getAdminById/:id", adminController.getAdminById);
router.put("/updateAdmin/:id", adminController.updateAdminById);
module.exports = router;
