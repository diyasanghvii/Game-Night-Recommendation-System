const User = require("../../models/User/userModal");
const {
  hashPassword,
  comparePasswords,
  generateJwtToken,
} = require("../../utils/authHelpers");

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
          name: req.body.name,
          email: req.body.email,
          token: generateJwtToken(req.body.email),
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
        name: req.body.name,
        email: req.body.email,
        token: generateJwtToken(req.body.email),
      });
    }
  } catch (e) {
    res.status(500).send("Error Occured, Try again!");
  }
};

// @desc Sign up step 2 Update API
// @route POST /user/signuptwo
// @access Private
const signUpTwo = async (req, res) => {
  try {
    let data = await User.findOne({ email: req.body.email }).exec();
    if (data) {
      await data.updateOne({
        steamId: req.body.steamId,
        discordUserName: req.body.discordUserName,
        discordChannelName: req.body.discordChannelName,
        discordServerName: req.body.discordServerName
      });
      res.status(200).json({
        message: "Updated User Information Successfully",
      });
    } else {
      res.status(400).json({
        message: "User Does Not Exists!",
      });
    }
  } catch (e) {
    res.status(500).send("Error Occured, Try again!");
  }
};

// @desc Sign up step 3 Update API
// @route POST /user/signupthree
// @access Private
const signUpThree = async (req, res) => {
  try {
    let data = await User.findOne({ email: req.body.email }).exec();
    if (data) {
      await data.updateOne({
        preferredGenres: req.body.preferredGenres,
        preferences: req.body.preferences,
      });
      res.status(200).json({
        message: "Updated User Preferences Successfully",
      });
    } else {
      res.status(400).json({
        message: "User Does Not Exists!",
      });
    }
  } catch (e) {
    res.status(500).send("Error Occured, Try again!");
  }
};

// @desc Get User Information API
// @route GET /user/getUserDetails
// @access Private
const getUserDetails = async (req, res) => {
  try {
    res.status(200).json({
      email: req.user.email,
      name: req.user.name,
      steamId: req.user.steamId,
      discordUserName: req.user.discordUserName,
      discordServerName: req.user.discordServerName,
      discordChannelName: req.user.discordChannelName,
      preferredGenres: req.user.preferredGenres,
      preferences: req.user.preferences,
      message: "User Details Fetched Sucessfully!",
    });
  } catch (e) {
    res.status(500).send("Error Occured, Try again!");
  }
};

// @desc Update User Genre API
// @route POST /user/updategenre
// @access Private
const updateGenre = async (req, res) => {
  try {
    let data = await User.findOne({ email: req.user.email }).exec();
    if (data) {
      await data.updateOne({
        preferredGenres: req.body.preferredGenres,
      });
      res.status(200).json({
        message: "User Genre Updated!",
        preferredGenres: req.body.preferredGenres,
      });
    } else {
      res.status(400).json({
        message: "User Does Not Exists!",
      });
    }
  } catch (e) {
    res.status(500).send("Error Occured, Try again!");
  }
};

// @desc Get User's ratings
// @route GET /user/getpreferences
// @access Private
const getUserRatings = async (req, res) => {
  try {
    res.status(200).json({
      preferences: req.user.preferences,
      message: "User Preferences Fetched Sucessfully!",
    });
  } catch (e) {
    res.status(500).send("Error Occured, Try again!");
  }
};

// @desc Update User Rating API
// @route POST /user/updaterating
// @access Private
const updateRating = async (req, res) => {
  try {
    const email = req.user.email;
    const newPreference = req.body.preference;
    let user = await User.findOne({ email }).exec();
    if (user) {
      const existingPreferenceIndex = user.preferences.findIndex(
        (preference) =>
          preference.gameName === newPreference.gameName &&
          (preference.gameSteamId === newPreference.gameSteamId ||
            preference.gameRawgId === newPreference.gameRawgId)
      );

      if (existingPreferenceIndex !== -1) {
        // update existing rating
        user.preferences[existingPreferenceIndex].gameSteamId = user
          .preferences[existingPreferenceIndex].gameSteamId
          ? user.preferences[existingPreferenceIndex].gameSteamId
          : newPreference.gameSteamId;
        user.preferences[existingPreferenceIndex].gameRawgId = user.preferences[
          existingPreferenceIndex
        ].gameRawgId
          ? user.preferences[existingPreferenceIndex].gameRawgId
          : newPreference.gameRawgId;
        user.preferences[existingPreferenceIndex].ratings =
          newPreference.ratings;
      } else {
        // add new rating
        user.preferences.push(newPreference);
      }
      await user.save();
      res.status(200).json({
        message: "User Preferences Updated!",
        preferences: user.preferences,
      });
    } else {
      res.status(400).json({
        message: "User Does Not Exist!",
      });
    }
  } catch (e) {
    res.status(500).send("Error Occured, Try again!");
  }
};

module.exports = {
  login,
  signUpOne,
  signUpTwo,
  signUpThree,
  getUserDetails,
  updateGenre,
  getUserRatings,
  updateRating,
};
