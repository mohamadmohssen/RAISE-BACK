// Import necessary modules
const db = require("../models");
const User = db.user;

// Function to add a user
const addUser = async (req, res) => {
  try {
    let info = {
      phone_number1: req.body.phone_number1,
      phone_number2: req.body.phone_number2,
      full_name: req.body.full_name,
      mother_name: req.body.mother_name,
      DOB: req.body.DOB,
      age: req.body.age,
      val_id: req.body.val_id,
      city: req.body.city,
      is_taken: 0,
      gender: req.body.gender,
      finished: false,
      result: 0,
      so_res: 0,
      au_res: 0,
      mg_res: 0,
      mf_res: 0,
      lex_res: 0,
      lco_res: 0,
      le_res: 0,
      nbre_res: 0,
      dg_res: 0,
    };

    const user = await User.create(info);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get all users
const getAllUsers = async (req, res) => {
  let users = await User.findAll({});
  res.status(200).send(users);
};

// Function to get users that are taken
const getTakedUsers = async (req, res) => {
  let takedusers = await User.findAll({
    where: {
      is_taken: true,
    },
  });
  res.status(200).send(takedusers);
};

// Function to get a user by phone number1
const getUserByPhoneNumber1 = async (req, res) => {
  try {
    const phoneNumber1 = req.params.phoneNumber1;
    const user = await User.findOne({
      where: { phone_number1: phoneNumber1 },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to update a user's is_taken status to 1
const updateUserToTaken = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (user) {
      user.is_taken = 1;
      await user.save();
      res.status(200).json({ message: "User updated to taken", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// New Function to get a user by user ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from request parameters
    const user = await User.findByPk(userId); // Find user by primary key

    if (user) {
      res.status(200).json(user); // If user found, return user data
    } else {
      res.status(404).json({ message: "User not found" }); // If user not found, return 404
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" }); // If there's an error, return 500
  }
};

const setUserFinished = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (user) {
      user.finished = true; // Set the finished status to true
      await user.save();
      res.status(200).json({ message: "User marked as finished", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserResult = async (req, res) => {
  try {
    const { userId, importantYesCount } = req.body;
    // Find the user by userId
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's result with the provided importantYesCount
    user.result = importantYesCount;
    await user.save();

    res.status(200).json({ message: "User result updated", user });
  } catch (error) {
    console.error("Error updating user result:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserResultsByType = async (req, res) => {
  try {
    const { userId, resultsByType } = req.body;

    // Find the user by userId
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's result for each type
    for (const [type, count] of Object.entries(resultsByType)) {
      const lowerCaseType = type.toLowerCase();
      console.log(lowerCaseType);
      user[`${lowerCaseType}_res`] = count;
    }

    await user.save();

    res.status(200).json({ message: "User results updated", user });
  } catch (error) {
    console.error("Error updating user results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export the functions
module.exports = {
  addUser,
  getAllUsers,
  getTakedUsers,
  getUserByPhoneNumber1,
  updateUserToTaken,
  getUserById, // Export the new function
  setUserFinished,
  updateUserResult,
  updateUserResultsByType,
};
