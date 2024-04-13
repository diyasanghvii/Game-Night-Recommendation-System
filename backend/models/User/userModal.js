const mongoose = require("mongoose");
const { Schema } = mongoose;

const preferenceSchema = new Schema({
  gameSteamId: Number,
  gameName: String,
  ratings: Number,
  interest: Number,
});

const steamGameSchema = new Schema({
  appid: Number,
  name: String,
  playtime_forever: Number,
  playtime_2weeks: Number,
  img_icon_url: String,
  has_community_visible_stats: Boolean,
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
  age: {
    type: Number,
  },
  steamId: {
    type: String,
  },
  discordUserName: {
    type: String,
  },
  steamGames: [steamGameSchema],
  preferredGenres: [{ type: String }],
  preferences: [preferenceSchema],
});

const userModal = mongoose.model("User", userSchema);
module.exports = userModal;