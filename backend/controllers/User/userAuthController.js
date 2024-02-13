const User = require("../../models/User/userModal");
const { hashPassword, comparePasswords } = require("../../utils/authHelpers");

// @desc Login API
// @route POST /user/login
// @access Public
const login = async (req, res) => {
  try {
    let data = await User.findOne({ email: req.body.email }).exec();
    if (data) {
      const passwordMatch = await comparePasswords(
        req.body.password,
        data.password
      );
      if (passwordMatch) {
        res.status(200).json({
          message: "Login Sucessful!",
        });
      } else {
        res.status(401).json({
          message: "Invalid Password, Try again!",
        });
      }
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
      const hashedPassword = await hashPassword(req.body.password);
      const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
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