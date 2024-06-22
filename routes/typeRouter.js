const express = require("express");
const router = express.Router();
const typeController = require("../controllers/typeController");

// Routes for the new unified table 'type_model'
router.post("/types", typeController.create);
router.get("/types", typeController.getAll);
router.get("/types/:id", typeController.getOne);
router.put("/types/:id", typeController.update);
router.delete("/types/:id", typeController.delete);
router.get("/types/type/:type", typeController.getByType); // New route to get records by type
router.get("/types/age/:age", typeController.getByAge);
router.get("/types/dg/age/:age", typeController.getByDgAge);

module.exports = router;
