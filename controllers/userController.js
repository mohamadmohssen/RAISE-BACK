// Import necessary modules
const { Op } = require("sequelize"); // Import Op directly from sequelize
const db = require("../models");
const User = db.user;
// Function to add a user
const addUser = async (req, res) => {
  try {
    // Extracting data from the request body, without age
    const {
      phone_number1,
      phone_number2,
      full_name,
      mother_name,
      DOB,
      val_id,
      city,
      gender,
    } = req.body;
    //-----------------------This commented function, adjust the age in months by rounding up to the next month if the number of days exceeds a certain threshold--------
    // const calculateAgeInMonths = (dob) => {
    //   const today = new Date();
    //   const birthDate = new Date(dob);
    //   const yearsDifference = today.getFullYear() - birthDate.getFullYear();
    //   const monthsDifference = today.getMonth() - birthDate.getMonth();
    //   const daysDifference = today.getDate() - birthDate.getDate();

    //   let ageInMonths = yearsDifference * 12 + monthsDifference;

    //   // Adjust for incomplete months
    //   if (daysDifference < 0) {
    //     ageInMonths--;
    //     // Calculate days in the previous month
    //     const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    //     const daysInPreviousMonth = previousMonth.getDate();
    //     const adjustedDays = daysInPreviousMonth + daysDifference;

    //     // If adjusted days >= 15, round up to next month
    //     if (adjustedDays >= 15) {
    //       ageInMonths++;
    //     }
    //   } else {
    //     // If daysDifference >= 15, round up to next month
    //     if (daysDifference >= 15) {
    //       ageInMonths++;
    //     }
    //   }

    //   return ageInMonths;
    // };
    // Function to calculate age in months
    const calculateAgeInMonths = (dob) => {
      const today = new Date();
      const birthDate = new Date(dob);
      const yearsDifference = today.getFullYear() - birthDate.getFullYear();
      const monthsDifference = today.getMonth() - birthDate.getMonth();
      const daysDifference = today.getDate() - birthDate.getDate();

      let ageInMonths = yearsDifference * 12 + monthsDifference;

      // If the day of the month is not reached, reduce the month difference
      if (daysDifference < 0) {
        ageInMonths--;
      }

      return ageInMonths;
    };

    // Calculate the age from DOB in months and round it
    const calculatedAge = Math.round(calculateAgeInMonths(DOB));

    // Find user by phone numbers and full name
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              {
                [Op.or]: [
                  { phone_number1: phone_number1 },
                  { phone_number2: phone_number1 },
                ],
              },
              { full_name: full_name },
            ],
          },
          {
            [Op.and]: [
              {
                [Op.or]: [
                  { phone_number1: phone_number2 },
                  { phone_number2: phone_number2 },
                ],
              },
              { full_name: full_name },
            ],
          },
        ],
      },
    });

    if (!user) {
      // User does not exist, create a new one
      const newUser = await User.create({
        phone_number1,
        phone_number2,
        full_name,
        mother_name,
        DOB,
        age: calculatedAge,
        val_id,
        city,
        gender,
        is_taken: 0,
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
        test_counter: 1,
      });
      res.status(200).json(newUser);
    } else {
      // User exists, check their details

      // Check if the DOB is correct
      if (user.DOB !== DOB) {
        res.status(400).json({
          message: "The provided Date of Birth does not match our records.",
        });
        return;
      }

      if (user.finished) {
        // If finished is true, reset fields and increment test_counter
        await user.update({
          phone_number1,
          phone_number2,
          full_name,
          mother_name,
          age: calculatedAge,
          val_id,
          city,
          gender,
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
          test_counter: user.test_counter + 1,
        });
      } else {
        // If finished is false, check age
        if (user.age !== calculatedAge) {
          // If age is different, reset fields and increment test_counter
          await user.update({
            phone_number1,
            phone_number2,
            full_name,
            mother_name,
            age: calculatedAge,
            val_id,
            city,
            gender,
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
            test_counter: user.test_counter + 1,
          });
        }
      }
      res.status(200).json(user);
    }
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
      where: {
        [Op.or]: [
          {
            [Op.or]: [{ phone_number1: phoneNumber1 }],
          },
          {
            [Op.or]: [{ phone_number2: phoneNumber1 }],
          },
        ],
      },
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
