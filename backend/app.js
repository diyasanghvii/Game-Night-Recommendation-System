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

// add routes
const testRoutes = require("./routes/route");
app.use("/", testRoutes);

// setup port
const port = process.env.PORT;

// // push to DB
// // app.js
// const User = require("./models/login");
// const user = new User({
//   userId: "001",
//   fullName: "john_doe",
//   password: "helloWorld",
//   email: "john@example.com",
// });

// user
//   .save()
//   .then(() => console.log("User saved to database"))
//   .catch((err) => console.error(err));

// setup listner
const server = app.listen(port, () =>
  console.log("Server is Running on port : ", port)
);
