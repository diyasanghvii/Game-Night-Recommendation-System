const User = require("../../models/User/userModal");

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
  editUserToDbTest,
  getUserFromDbTest,
  deleteUserFromDbTest,
};
