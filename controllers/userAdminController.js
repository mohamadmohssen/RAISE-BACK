const db = require("../models");
const User = db.user;
const Admin = db.admin;
const UserAdmin = db.userAdmin;

// Function to take a user by an admin
const takeUser = async (req, res) => {
  try {
    console.log(req.body.userid);
    const userId = req.body.userid;
    const adminId = req.body.adminid;
    console.log(userId);
    console.log(adminId);

    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the admin
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update the user's is_taken to 1
    user.is_taken = 1;
    await user.save();

    // Add a record to user_admins table
    await UserAdmin.create({
      user_id: userId,
      admin_id: adminId,
    });

    res.status(200).json({ message: "User taken successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get all admin-user connections
const getAllAdminUserConnections = async (req, res) => {
  try {
    // Fetch all connections from user_admins table
    const connections = await UserAdmin.findAll({
      include: [
        {
          model: User,
          attributes: ["user_id", "full_name", "phone_number1"],
        },
        {
          model: Admin,
          attributes: [
            "admin_id",
            "first_name",
            "last_name",
            "email",
            "phone_number",
          ],
        },
      ],
    });

    // Format the response
    const result = connections.map((connection) => ({
      user: {
        user_id: connection.user.user_id,
        full_name: connection.user.full_name,
        phone_number1: connection.user.phone_number1,
      },
      admin: {
        admin_id: connection.admin.admin_id,
        first_name: connection.admin.first_name,
        last_name: connection.admin.last_name,
        email: connection.admin.email,
        phone_number: connection.admin.phone_number,
      },
      createdAt: connection.createdAt,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUserAdminConnection = async (req, res) => {
  try {
    const userId = req.body.userid;
    const adminId = req.body.adminid;

    // Find and delete the connection
    const connection = await UserAdmin.findOne({
      where: {
        user_id: userId,
        admin_id: adminId,
      },
    });

    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }

    await connection.destroy();
    // After deletion, check if the user still has any connections in UserAdmin
    const remainingConnections = await UserAdmin.findOne({
      where: {
        user_id: userId,
      },
    });

    // If no remaining connections, update is_taken to false in User model
    if (!remainingConnections) {
      const user = await User.findByPk(userId);
      if (user) {
        user.is_taken = false;
        await user.save();
      }
    }

    res.status(200).json({ message: "Connection deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsersByAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    console.log(adminId);
    const connections = await UserAdmin.findAll({
      where: { admin_id: adminId },
      include: [
        {
          model: User,
          attributes: [
            "user_id",
            "full_name",
            "phone_number1",
            "mother_name",
            "DOB",
            "age",
            "city",
            "gender",
            "result",
          ],
        },
      ],
    });

    const users = connections.map((connection) => connection.user);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsersByAdmin };

const getAdminsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const connections = await UserAdmin.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Admin,
          attributes: ["admin_id", "first_name", "last_name", "email"],
        },
      ],
    });

    const admins = connections.map((connection) => connection.admin);
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  takeUser,
  getAllAdminUserConnections,
  deleteUserAdminConnection,
  getUsersByAdmin,
  getAdminsByUser,
};
