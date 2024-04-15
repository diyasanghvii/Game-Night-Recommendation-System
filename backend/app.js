// import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();

// add mongo db using mongose
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected successfully!");
  })
  .catch((err) => {
    console.log("DB connection error :", err);
  });

// add middlewares
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// add routes
const authRoutes = require("./routes/Auth/authRoute");
app.use("/api/auth", authRoutes);

// user routes
const userAuthRoutes = require("./routes/User/userAuthRoute");
app.use("/api/user", userAuthRoutes);

// game info routes
const gameRoutes = require("./routes/Games/gameInfoRoute");
app.use("/api/game", gameRoutes);

// steam data info routes
const steamRoutes = require("./routes/Games/steamInfoRoute");
app.use("/api/steam", steamRoutes);

// discord routes
const discordRoutes = require("./routes/User/discordRoute");
app.use("/api/discord", discordRoutes);

// rawg data info routes
const steamSearchRoutes = require("./routes/Games/searchInfoRoute");
app.use("/api/search", steamSearchRoutes);

// recommend games info routes
const recommendRoutes = require("./routes/Games/recommendInfoRoute");
app.use("/api/recommend", recommendRoutes);

module.exports = app;
