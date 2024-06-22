const db = require("../models");
const Type = db.type; // Use the new unified table model
const typeController = {
  // Create a new record
  create: async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      const newItem = await Type.create(data);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({
        error: `Failed to create entry in type_model`,
        details: error.message,
      });
    }
  },

  // Retrieve all records
  getAll: async (req, res) => {
    try {
      const itemList = await Type.findAll();
      res.status(200).json(itemList);
    } catch (error) {
      res.status(500).json({
        error: `Failed to retrieve entries from type_model`,
        details: error.message,
      });
    }
  },

  // Retrieve a single record by ID
  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const item = await Type.findOne({ where: { type_id: id } });
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ error: `Entry not found in type_model` });
      }
    } catch (error) {
      res.status(500).json({
        error: `Failed to retrieve entry from type_model`,
        details: error.message,
      });
    }
  },

  // Update a record by ID
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await Type.update(req.body, {
        where: { type_id: id },
      });
      if (updated) {
        const updatedItem = await Type.findOne({ where: { type_id: id } });
        res.status(200).json(updatedItem);
      } else {
        res.status(404).json({ error: `Entry not found in type_model` });
      }
    } catch (error) {
      res.status(500).json({
        error: `Failed to update entry in type_model`,
        details: error.message,
      });
    }
  },

  // Delete a record by ID
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await Type.destroy({
        where: { type_id: id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: `Entry not found in type_model` });
      }
    } catch (error) {
      res.status(500).json({
        error: `Failed to delete entry from type_model`,
        details: error.message,
      });
    }
  },

  // Retrieve records by type
  getByType: async (req, res) => {
    try {
      const type = req.params.type;
      const items = await Type.findAll({ where: { type } });
      if (items.length > 0) {
        res.status(200).json(items);
      } else {
        res.status(404).json({ error: `No entries found for type: ${type}` });
      }
    } catch (error) {
      res.status(500).json({
        error: `Failed to retrieve entries by type from type_model`,
        details: error.message,
      });
    }
  },

  getByAge: async (req, res) => {
    try {
      const age = req.params.age;
      const items = await Type.findAll({ where: { age } });
      if (items.length > 0) {
        res.status(200).json(items);
      } else {
        res.status(404).json({ error: `No entries found for age: ${age}` });
      }
    } catch (error) {
      res.status(500).json({
        error: `Failed to retrieve entries by age from type_model`,
        details: error.message,
      });
    }
  },
  getByDgAge: async (req, res) => {
    try {
      const age = req.params.age;
      const type = "dg"; // Specify the type as "dg"

      // Fetch entries by age and type "dg"
      const items = await Type.findAll({ where: { age, type } });

      if (items.length > 0) {
        res.status(200).json(items);
      } else {
        res
          .status(404)
          .json({
            error: `No entries found for age: ${age} and type: ${type}`,
          });
      }
    } catch (error) {
      res.status(500).json({
        error: `Failed to retrieve entries by age and type from type_model`,
        details: error.message,
      });
    }
  },
};

module.exports = typeController;
