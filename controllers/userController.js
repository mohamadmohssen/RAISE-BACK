const db = require("../models");

// model
const User = db.user;

//add user
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
      is_taken: 1,
      gender: req.body.gender,
    };

    const user = await User.create(info);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAllUsers = async (req, res) => {
  let users = await User.findAll({});
  res.status(200).send(users);
};
const getTakedUsers = async (req, res) => {
  let takedusers = await User.findAll({
    where: {
      is_taken: true,
    },
  });
  res.status(200).send(takedusers);
};

module.exports = {
  addUser,
  getAllUsers,
  getTakedUsers,
};
