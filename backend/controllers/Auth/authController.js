const User = require("../../models/User/userModal");

// @desc Profile Authentication API
// @route GET /user/profile
// @access Public
const profile = async (req, res) => {
  try {
    res.status(200).json({
      isValidUser: true,
      message: "Login Sucessful!",
    });
  } catch (e) {
    res.status(500).send("Error Occured, Try again!");
  }
};

module.exports = {
  profile,
};
