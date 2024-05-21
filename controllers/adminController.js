const db = require("../models");
const { Sequelize } = require("sequelize"); // Ensure Sequelize is imported

// model
const Admin = db.admin;

const addAdmin = async (req, res) => {
  try {
    let info = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      city: req.body.city,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };

    const admin = await Admin.create(info);
    console.log(admin);
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" + error });
  }
};

const checkUserExists = async (identifier) => {
  try {
    // Search for the user by username or email
    const user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ username: identifier }, { email: identifier }],
      },
    });

    // Return true if user is found, false otherwise
    return user ? true : false;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    throw new Error("Error checking if user exists");
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    console.log(admins);
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAdmin = async (req, res) => {
  const adminId = req.params.id; // Assuming you pass the admin id in the URL params

  try {
    // Find the admin by id
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Delete the admin
    await admin.destroy();

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllTherapists = async (req, res) => {
  try {
    const therapists = await Admin.findAll({
      where: {
        role: 1, // Assuming 1 represents the therapist role
      },
    });

    res.status(200).json(therapists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUnderSuperAdmin = async (req, res) => {
  try {
    const therapists = await Admin.findAll({
      where: {
        role: 2, // Assuming 2 represents the admin role
      },
    });

    res.status(200).json(therapists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editAdminRole = async (req, res) => {
  const adminId = req.params.id;
  const { role } = req.body;

  try {
    // Find the admin by id
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Update the role
    admin.role = role;
    await admin.save();

    res.status(200).json({ message: "Admin role updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addAdmin,
  getAllAdmins,
  deleteAdmin,
  getAllTherapists,
  getAllUnderSuperAdmin,
  editAdminRole,
  checkUserExists,
};
