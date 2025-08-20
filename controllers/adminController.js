const db = require("../models");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Admin = db.admin;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  console.log(token);
  try {
    const user = await Admin.findOne({ where: { resetPasswordToken: token } });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update user's password
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const forgottenPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await Admin.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a token for password reset
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // Token expiry in 1 hour

    // Send email with password reset link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mmodestmo@gmail.com", // Replace with your email address
        pass: "nseieppfjjoqylwt", // Replace with your email password or app password
      },
    });

    const mailOptions = {
      from: "mmodestmo@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:5173/reset/${resetToken} \n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending password reset email:", error);
        return res.status(500).json({ message: "Failed to send reset email" });
      }
      console.log("Password reset email sent:", info.response);

      // Assuming you want to store the token temporarily in memory for verification
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = resetTokenExpiry;
      user.save();

      res
        .status(200)
        .json({ message: "Password reset email sent successfully" });
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
      is_accepted: true,
    };

    const admin = await Admin.create(info);
    console.log(admin);
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" + error });
  }
};

const signUp = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);

    const { first_name, last_name, city, phone_number, email, password, role } =
      req.body;
    console.log("Parsed data:", {
      first_name,
      last_name,
      city,
      phone_number,
      email,
      password,
      role,
    });

    if (
      !first_name ||
      !last_name ||
      !city ||
      !phone_number ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await Admin.findOne({ where: { email } });
    console.log("User search result:", user);

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hashed password:", hashedPassword);

    const newUser = await Admin.create({
      first_name,
      last_name,
      city,
      phone_number,
      email,
      password: hashedPassword,
      role,
      is_accepted: false,
    });

    console.log("New user created:", newUser);
    return res.status(200).json({ message: "User added successfully." });
  } catch (error) {
    console.error("Error in signUp:", error);
    next(error);
  }
};

const getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findOne({ where: { admin_id: id } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).send(admin);
  } catch (error) {
    console.error("Error fetching admin by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await Admin.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ admin_id: user.admin_id }, "secretkey123", {
      expiresIn: "90d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { name: `${user.first_name} ${user.last_name}` },
    });
  } catch (error) {
    console.error("Error in login:", error);
    next(error);
  }
};

const updateAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      first_name,
      last_name,
      city,
      phone_number,
      email,
      role,
      is_accepted,
    } = req.body;

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.first_name = first_name;
    admin.last_name = last_name;
    admin.city = city;
    admin.phone_number = phone_number;
    admin.email = email;
    admin.role = role;
    admin.is_accepted = is_accepted;

    await admin.save();

    return res
      .status(200)
      .json({ message: "Admin updated successfully", admin });
  } catch (error) {
    console.error("Error updating admin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAdminData = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access token is missing or invalid" });
    }

    jwt.verify(token, "secretkey123", async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid" });
      }

      const adminId = user.admin_id;
      const admin = await Admin.findByPk(adminId, {
        attributes: [
          "admin_id",
          "first_name",
          "last_name",
          "city",
          "phone_number",
          "email",
          "role",
          "is_accepted",
        ],
      });

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      return res.status(200).json(admin);
    });
  } catch (error) {
    console.error("Error fetching admin data from controller:", error);
    next(error);
  }
};

const checkUserExists = async (identifier) => {
  try {
    const user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ username: identifier }, { email: identifier }],
      },
    });

    return user ? true : false;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    throw new Error("Error checking if user exists");
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      where: { is_accepted: true },
    });
    console.log(admins);
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

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
      where: { role: 2 },
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
      where: { role: 3 },
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
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    admin.role = role;
    await admin.save();

    res.status(200).json({ message: "Admin role updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllRequestedAdminsTherapists = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      where: {
        is_accepted: false,
        role: 0,
      },
    });
    console.log(admins);
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllRequestedAdminsUnderSuperAdmin = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      where: {
        is_accepted: false,
        role: 1,
      },
    });
    console.log(admins);
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const acceptTherapist = async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    admin.role = 2;
    admin.is_accepted = true;
    await admin.save();

    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const acceptUnderSuperAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    admin.role = 3;
    admin.is_accepted = true;
    await admin.save();

    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addAdmin,
  getAllAdmins,
  deleteAdmin,
  getAdminData,
  getAllTherapists,
  getAllUnderSuperAdmin,
  editAdminRole,
  checkUserExists,
  signUp,
  login,
  getAdminById,
  updateAdminById,
  getAllRequestedAdminsTherapists,
  getAllRequestedAdminsUnderSuperAdmin,
  acceptTherapist,
  acceptUnderSuperAdmin,
  resetPassword,
  forgottenPassword,
};
