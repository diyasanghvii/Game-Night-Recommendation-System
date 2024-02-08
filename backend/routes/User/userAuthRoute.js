const express = require("express");
const testUserRouter = express.Router();

// controllers
const { login } = require("../../controllers/User/userAuthController");

// api routes
testUserRouter.post("/login", login);

module.exports = testUserRouter;
