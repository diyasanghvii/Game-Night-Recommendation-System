const User = require("../../models/User/userModal");

// @desc Login API
// @route POST /user/login
// @access Public
const login = async (req, res) => {
  try {
    let data = await User.findOne({ email: req.body.email }).exec();
    if (data && data.password === req.body.password) {
      res.status(200).json({
        message: "Login Sucessful!",
      });
    } else {
      res.status(401).json({
        message: "Invalid Credientials, Try again!",
      });
    }
  } catch (e) {
    res.status(401).send("Invalid Credientials, Try again!");
  }
};

// @desc Sign up step 1 API
// @route POST /user/signupone
// @access Public
const signUpOne = async (req, res) => {
  try {
    let data = await User.findOne({ email: req.body.email }).exec();
    if (data) {
      res.status(400).json({
        message: "User Already Exists!",
      });
    } else {
      const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      await user.save();
      res.status(200).json({
        message: "Account Created Successfully!",
      });
    }
  } catch (e) {
    res.status(500).send("Error Occured, Try again!");
  }
};

module.exports = {
  login,
  signUpOne,
};