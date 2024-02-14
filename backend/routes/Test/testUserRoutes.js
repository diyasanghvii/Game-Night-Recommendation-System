const express = require("express");
const testUserRouter = express.Router();

// controllers
const {
  editUserToDbTest,
  getUserFromDbTest,
  deleteUserFromDbTest,
} = require("../../controllers/Test/testUserController");

// api routes
testUserRouter.post("/editUserToDbTest", editUserToDbTest);
testUserRouter.get("/getUserFromDbTest", getUserFromDbTest);
testUserRouter.delete("/deleteUserFromDbTest", deleteUserFromDbTest);

module.exports = testUserRouter;
