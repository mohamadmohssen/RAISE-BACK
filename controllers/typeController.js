const db = require("../models");

// models
const AU = db.au;
const SO = db.so;
const MG = db.mg;
const MF = db.mf;
const NBRE = db.nbre;
const LCO = db.lco;
const LE = db.le;
const LEX = db.lex;
const DG = db.dg;

// Helper function to create CRUD operations
const createCRUD = (Model, modelName) => {
  return {
    create: async (req, res) => {
      try {
        const newItem = await Model.create(req.body);
        res.status(201).json(newItem);
      } catch (error) {
        res.status(500).json({
          error: `Failed to create ${modelName}`,
          details: error.message,
        });
      }
    },

    getAll: async (req, res) => {
      try {
        const itemList = await Model.findAll();
        res.status(200).json(itemList);
      } catch (error) {
        res.status(500).json({
          error: `Failed to retrieve ${modelName} entries`,
          details: error.message,
        });
      }
    },

    update: async (req, res) => {
      try {
        const id = req.params.id;
        const [updated] = await Model.update(req.body, {
          where: { id },
        });
        if (updated) {
          const updatedItem = await Model.findOne({ where: { id } });
          res.status(200).json(updatedItem);
        } else {
          res.status(404).json({ error: `${modelName} entry not found` });
        }
      } catch (error) {
        res.status(500).json({
          error: `Failed to update ${modelName} entry`,
          details: error.message,
        });
      }
    },

    delete: async (req, res) => {
      try {
        const id = req.params.id;
        const deleted = await Model.destroy({
          where: { id },
        });
        if (deleted) {
          res.status(204).send();
        } else {
          res.status(404).json({ error: `${modelName} entry not found` });
        }
      } catch (error) {
        res.status(500).json({
          error: `Failed to delete ${modelName} entry`,
          details: error.message,
        });
      }
    },
    getOne: async (req, res) => {
      try {
        const id = req.params.id;
        const type = await Model.findOne({ where: { id: id } });
        res.status(200).send(type);
      } catch (error) {
        res.status(500).json({
          error: `Failed to retrieve ${modelName} entry`,
          details: error.message,
        });
      }
    },
  };
};

// Create CRUD operations for each model
const auCRUD = createCRUD(AU, "AU");
const soCRUD = createCRUD(SO, "SO");
const mgCRUD = createCRUD(MG, "MG");
const mfCRUD = createCRUD(MF, "MF");
const nbreCRUD = createCRUD(NBRE, "NBRE");
const lcoCRUD = createCRUD(LCO, "LCO");
const leCRUD = createCRUD(LE, "LE");
const lexCRUD = createCRUD(LEX, "LEX");
const dgCRUD = createCRUD(DG, "DG");

module.exports = {
  // AU
  createAU: auCRUD.create,
  getAllAU: auCRUD.getAll,
  updateAU: auCRUD.update,
  deleteAU: auCRUD.delete,
  getOneAU: auCRUD.getOne,
  // SO
  createSO: soCRUD.create,
  getAllSO: soCRUD.getAll,
  updateSO: soCRUD.update,
  deleteSO: soCRUD.delete,
  getOneSO: soCRUD.getOne,

  // MG
  createMG: mgCRUD.create,
  getAllMG: mgCRUD.getAll,
  updateMG: mgCRUD.update,
  deleteMG: mgCRUD.delete,
  getOneMG: mgCRUD.getOne,

  // MF
  createMF: mfCRUD.create,
  getAllMF: mfCRUD.getAll,
  updateMF: mfCRUD.update,
  deleteMF: mfCRUD.delete,
  getOneMF: mfCRUD.getOne,

  // NBRE
  createNBRE: nbreCRUD.create,
  getAllNBRE: nbreCRUD.getAll,
  updateNBRE: nbreCRUD.update,
  deleteNBRE: nbreCRUD.delete,
  getOneNBRE: nbreCRUD.getOne,

  // LCO
  createLCO: lcoCRUD.create,
  getAllLCO: lcoCRUD.getAll,
  updateLCO: lcoCRUD.update,
  deleteLCO: lcoCRUD.delete,
  getOneLCO: lcoCRUD.getOne,

  // LE
  createLE: leCRUD.create,
  getAllLE: leCRUD.getAll,
  updateLE: leCRUD.update,
  deleteLE: leCRUD.delete,
  getOneLE: leCRUD.getOne,

  // LEX
  createLEX: lexCRUD.create,
  getAllLEX: lexCRUD.getAll,
  updateLEX: lexCRUD.update,
  deleteLEX: lexCRUD.delete,
  getOneLEX: lexCRUD.getOne,

  // DG
  createDG: dgCRUD.create,
  getAllDG: dgCRUD.getAll,
  updateDG: dgCRUD.update,
  deleteDG: dgCRUD.delete,
  getOneDG: dgCRUD.getOne,
};
