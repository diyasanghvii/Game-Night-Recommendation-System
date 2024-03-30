const User = require("../../models/User/userModal");
const axios = require("axios");
const {
  hashPassword,
  comparePasswords,
  generateJwtToken,
} = require("../../utils/authHelpers");
const STEAM_BASE_URL = "http://api.steampowered.com";

// @desc Login API
// @route POST /user/login
// @access Public

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      const passwordMatch = await comparePasswords(
        req.body.password,
        user.password
      );
      if (passwordMatch) {
        if (!user.steamId || !user.discordUserName) {
          //redirect to signup 2
          return res.status(200).json({
            name: user.name,
            email: user.email,
            redirect: true,
            initialStep: 1,
            token: generateJwtToken(user.email),
            message: "Please complete your profile information.",
          });
        } else if (
          user.preferences.length == 0 ||
          user.preferredGenres.length == 0
        ) {
          //redirect to signup 3
          return res.status(200).json({
            name: user.name,
            email: user.email,
            redirect: true,
            initialStep: 2,
            token: generateJwtToken(user.email),
            message: "Please complete your profile information.",
          });
        } else {
          // Proceed with login
          res.status(200).json({
            name: user.name,
            email: user.email,
            token: generateJwtToken(user.email),
            message: "Login Sucessful!",
          });
        }
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
    const { email, steamId, discordUserName } = req.body;

    // Check if the Steam ID or Discord Username already exists in the database
    const existingUser = await User.findOne({
      $or: [{ steamId }, { discordUserName }],
    }).exec();

    if (existingUser) {
      let errorMessage = "";
      if (existingUser.steamId === steamId) {
        errorMessage = "Steam ID already exists!";
      } else if (existingUser.discordUserName === discordUserName) {
        errorMessage = "Discord Username already exists!";
      }
      return res.status(400).json({ message: errorMessage });
    }

    // If user does not exist, update the user information
    let data = await User.findOne({ email }).exec();
    if (data) {
      await data.updateOne({
        steamId,
        discordUserName,
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
        token: generateJwtToken(req.body.email),
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
      if (user.preferences.length > 0) {
        const existingPreferenceIndex = user.preferences.findIndex(
          (preference) =>
            parseInt(preference.gameSteamId) ===
            parseInt(newPreference.gameSteamId)
        );

        if (existingPreferenceIndex !== -1) {
          user.preferences[existingPreferenceIndex].ratings =
            newPreference.ratings;
          user.preferences[existingPreferenceIndex].interest = null;
        } else {
          user.preferences.push(newPreference);
        }
      } else {
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

// @desc Update User Rating API for unowned games
// @route POST /user/updateunownedgamerating
// @access Private
const saveGameUnOwnedRating = async (req, res) => {
  try {
    const email = req.user.email;
    const newPreference = req.body;
    let user = await User.findOne({ email }).exec();
    if (user) {
      if (user.preferences && user.preferences.length > 0) {
        const existingPreferenceIndex = user.preferences.findIndex(
          (preference) =>
            parseInt(preference.gameSteamId) ===
            parseInt(newPreference.gameSteamId)
        );
        if (existingPreferenceIndex !== -1) {
          user.preferences[existingPreferenceIndex].interest =
            newPreference.interest;
          user.preferences[existingPreferenceIndex].ratings = null;
        } else {
          user.preferences.push(newPreference);
        }
      } else {
        user.preferences.push(newPreference);
      }
      await user.save();
      let updatedUser = await User.findOne({ email }).exec();
      res.status(200).json({
        message: "User Preferences Updated!",
        preferences: updatedUser.preferences,
      });
    } else {
      res.status(400).json({
        message: "User Does Not Exist!",
      });
    }
  } catch (e) {
    console.log("Error --->", e);

    res.status(500).send("Error Occured, Try again!");
  }
};

// @desc Verify User Steam ID
// @route POST /user/verifyusersteamid
// @access Private
const verifyUserSteamId = async (req, res) => {
  try {
    const steamId = req.query.steamId;
    const email = req.user.email;
    const url = `${STEAM_BASE_URL}/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=True&include_played_free_games=True`;
    const response = await axios.get(url);
    if (response && response.data && response.data.response) {
      const gamesCount = response.data.response.game_count || 0; // Get game count or default to 0
      if (
        email &&
        response.data &&
        response.data.response &&
        response.data.response.games &&
        response.data.response.games.length > 0
      ) {
        let userInfo = await User.findOne({ email: req.user.email }).exec();
        await userInfo.updateOne({
          steamGames: response.data.response.games,
        });
      }
      res.status(200).send({
        message: "Steam Id Valid!",
        status: true,
        gamesCount: gamesCount,
      });
    } else {
      res.status(400).send({
        message: "Steam Id Invalid!",
        status: false,
      });
    }
  } catch (e) {
    console.log("Error : ", e);
    res.status(500).send("Steam Id Invalid!");
  }
};

// @desc Clear User Ratings
// @route POST /user/clearrating
// @access Private
const clearRating = async (req, res) => {
  try {
    let userInfo = await User.findOne({ email: req.user.email }).exec();
    let pref = userInfo?.preferences;
    const index = pref?.findIndex(
      (ele) => ele.gameSteamId === req.body.gameSteamId
    );

    if (index !== -1) {
      pref.splice(index, 1);
    }

    await userInfo.updateOne({
      preferences: pref,
    });
    let updatedUserInfo = await User.findOne({ email: req.user.email }).exec();
    res.status(200).send({
      message: "Ratings cleared Successfully!",
      preferences: updatedUserInfo.preferences,
    });
  } catch (e) {
    console.log("Error : ", e);
    res.status(500).send("Ratings not cleared!");
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
  saveGameUnOwnedRating,
  verifyUserSteamId,
  clearRating,
};
