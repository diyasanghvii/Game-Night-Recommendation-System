const mongoose = require("mongoose");
const { Schema } = mongoose;

const preferenceSchema = new Schema({
  gameSteamId: Number,
  gameName: String,
  ratings: Number,
  interest: Number,
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  steamId: {
    type: String,
  },
  discordUserName: {
    type: String,
  },
  preferredGenres: [{ type: String }],
  preferences: [preferenceSchema],
});

const userModal = mongoose.model("User", userSchema);
module.exports = userModal;