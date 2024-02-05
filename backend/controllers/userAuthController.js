const User = require("../models/userModal");

// Simple Login API
const login = async (req, res) => {
  try {
    let data = await User.findOne({ email: req.body.email }).exec();
    console.log("Data : ", data);
    if (data.password === req.body.password) {
      res.status(200).json({
        message: "Login Sucessful!",
      });
    } else {
      res.status(401).json({
        message: "Invalid Credientials, Try again!",
      });
    }
  } catch (e) {
    console.log("Error : ", e);
    res.status(401).send("Invalid Credientials, Try again!");
  }
};

module.exports = {
  login,
};
