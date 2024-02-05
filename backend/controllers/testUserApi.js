const User = require("../models/userModal");

// add user to DB test
const addUserToDbTest = async (req, res) => {
  try {
    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      gender: req.body.gender,
      steamId: req.body.steamId,
      discordId: req.body.discordId,
    });
    await user.save();
    res.status(200).json({
      message: "Successfully added user to DB!",
    });
  } catch (e) {
    console.log("Error : ", e);
    if (err.code == "11000") {
      res.status(500).send("User Already Exists!");
    }
  }
};

// edit user to DB test
const editUserToDbTest = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    await data.updateOne({
      name: req.body.name,
    });
    res.status(200).json({
      message: "Editted User Successfully",
    });
  } catch (e) {
    console.log("Error : ", e);
    res.status(500).send("Cannot Edit User, Try again!");
  }
};

// get user to DB test
const getUserFromDbTest = async (req, res) => {
  try {
    let data = await User.findOne({ email: req.query.email }).exec();
    res.status(200).json({
      data: data,
    });
  } catch (e) {
    console.log("Error : ", e);
    res.status(500).send("Cannot Get User Information, Try again!");
  }
};

// delete user to DB test
const deleteUserFromDbTest = async (req, res) => {
  try {
    let data = await User.deleteOne({ email: req.query.email });
    res.status(200).json({
      message: "Deleted user from DB",
    });
  } catch (e) {
    console.log("Error : ", e);
    res.status(500).send("Cannot Delete User, Try again!");
  }
};

module.exports = {
  addUserToDbTest,
  editUserToDbTest,
  getUserFromDbTest,
  deleteUserFromDbTest,
};