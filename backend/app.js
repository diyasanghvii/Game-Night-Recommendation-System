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
const testUserRoutes = require("./routes/testUserRoutes");
app.use("/user", testUserRoutes);

// setup port
const port = process.env.PORT;

// setup listner
const server = app.listen(port, () =>
  console.log("Server is Running on port : ", port)
);
