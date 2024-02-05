const express = require("express");
const testUserRouter = express.Router();

// controllers
const { login } = require("../controllers/userAuthController");

// api routes
testUserRouter.post("/login", login);

module.exports = testUserRouter;
