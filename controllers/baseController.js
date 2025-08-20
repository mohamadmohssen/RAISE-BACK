const db = require("../models");
const Base = db.base;

exports.create = async (req, res) => {
  const { risk, high_risk } = req.body;

  try {
    const newBase = await Base.create({ risk, high_risk });
    res.status(201).json(newBase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const bases = await Base.findAll({});
    res.status(200).json(bases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single base model entry by id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const base = await Base.findByPk(id);
    if (!base) {
      return res.status(404).json({ message: "Base not found" });
    }
    res.status(200).json(base);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a base model entry by id
exports.update = async (req, res) => {
  const id = req.params.id;
  const { risk, high_risk } = req.body;

  try {
    const base = await Base.findByPk(id);
    if (!base) {
      return res.status(404).json({ message: "Base not found" });
    }

    base.risk = risk;
    base.high_risk = high_risk;
    await base.save();

    res.status(200).json(base);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a base model entry by id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const base = await Base.findByPk(id);
    if (!base) {
      return res.status(404).json({ message: "Base not found" });
    }

    await base.destroy();
    res.status(200).json({ message: "Base deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
