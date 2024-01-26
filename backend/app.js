// import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();

// add mongo db using mongose

// add middlewares
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));

// add routes
const testRoutes = require("./routes/route");
app.use("/", testRoutes);

// setup port
const port = process.env.PORT;

// setup listner
const server = app.listen(port, () =>
  console.log("Server is Running on port : ", port)
);
