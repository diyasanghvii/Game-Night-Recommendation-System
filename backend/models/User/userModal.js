const mongoose = require("mongoose");
const { Schema } = mongoose;

const preferenceSchema = new Schema({
  gameName: String,
  ratings: Number,
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
    type: String,
  },
  gender: {
    type: String,
  },
  steamId: {
    type: String,
  },
  discordId: {
    type: String,
  },
  webhookUrl: {
    type: String,
  },
  preferredGenres: [{ type: String }],
  preferences: [preferenceSchema],
});

const userModal = mongoose.model("User", userSchema);
module.exports = userModal;