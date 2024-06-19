const express = require("express");
const router = express.Router();
const baseController = require("../controllers/baseController");

// Create a new base model entry
router.post("/", baseController.create);

// Get all base model entries
router.get("/", baseController.findAll);

// Get a single base model entry by id
router.get("/:id", baseController.findOne);

// Update a base model entry by id
router.put("/:id", baseController.update);

// Delete a base model entry by id
router.delete("/:id", baseController.delete);

module.exports = router;
