const express = require("express");
const router = express.Router();
const typeController = require("../controllers/typeController");

// AU routes
router.post("/au", typeController.createAU);
router.get("/au", typeController.getAllAU);

// SO routes
router.post("/so", typeController.createSO);
router.get("/so", typeController.getAllSO);

// MG routes
router.post("/mg", typeController.createMG);
router.get("/mg", typeController.getAllMG);

// MF routes
router.post("/mf", typeController.createMF);
router.get("/mf", typeController.getAllMF);

// NBRE routes
router.post("/nbre", typeController.createNBRE);
router.get("/nbre", typeController.getAllNBRE);

// LCO routes
router.post("/lco", typeController.createLCO);
router.get("/lco", typeController.getAllLCO);

// LE routes
router.post("/le", typeController.createLE);
router.get("/le", typeController.getAllLE);

// LEX routes
router.post("/lex", typeController.createLEX);
router.get("/lex", typeController.getAllLEX);

// DG routes
router.post("/dg", typeController.createDG);
router.get("/dg", typeController.getAllDG);

//ids
router.put("/dg/:id", typeController.updateDG);
router.delete("/dg/:id", typeController.deleteDG);
router.put("/au/:id", typeController.updateAU);
router.delete("/au/:id", typeController.deleteAU);
router.put("/lex/:id", typeController.updateLEX);
router.put("/le/:id", typeController.updateLE);
router.put("/lco/:id", typeController.updateLCO);
router.put("/nbre/:id", typeController.updateNBRE);
router.put("/mf/:id", typeController.updateMF);
router.put("/mg/:id", typeController.updateMG);
router.put("/so/:id", typeController.updateSO);
router.delete("/so/:id", typeController.deleteSO);
router.delete("/mg/:id", typeController.deleteMG);
router.delete("/mf/:id", typeController.deleteMF);
router.delete("/nbre/:id", typeController.deleteNBRE);
router.delete("/lco/:id", typeController.deleteLCO);
router.delete("/le/:id", typeController.deleteLE);
router.delete("/lex/:id", typeController.deleteLEX);
router.get("/au/:id", typeController.getOneAU);
router.get("/le/:id", typeController.getOneLE);
router.get("/MG/:id", typeController.getOneMG);
router.get("/nbre/:id", typeController.getOneNBRE);
router.get("/lex/:id", typeController.getOneLEX);
router.get("/lco/:id", typeController.getOneLCO);
router.get("/so/:id", typeController.getOneSO);
router.get("/mf/:id", typeController.getOneMF);
router.get("/le/:id", typeController.getOneLE);

module.exports = router;
