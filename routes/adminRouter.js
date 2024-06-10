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
router.get(
  "/getRequestedTherapists",
  adminController.getAllRequestedAdminsTherapists
);
router.get(
  "/getRequestedAdmins",
  adminController.getAllRequestedAdminsUnderSuperAdmin
);
router.get("/getAdminById/:id", adminController.getAdminById);
router.put("/updateAdmin/:id", adminController.updateAdminById);
router.put("/acceptTherapist/:id", adminController.acceptTherapist);
router.put("/acceptUnderSuperAdmin/:id", adminController.acceptUnderSuperAdmin);
router.delete("/deleteRequest/:id", adminController.deleteAdmin);
module.exports = router;
