const express = require("express");
const testUserRouter = express.Router();

// controllers
const {
  addUserToDbTest,
  editUserToDbTest,
  getUserFromDbTest,
  deleteUserFromDbTest,
} = require("../../controllers/Test/testUserController");

// api routes
testUserRouter.post("/addUserToDbTest", addUserToDbTest);
testUserRouter.post("/editUserToDbTest", editUserToDbTest);
testUserRouter.get("/getUserFromDbTest", getUserFromDbTest);
testUserRouter.delete("/deleteUserFromDbTest", deleteUserFromDbTest);

module.exports = testUserRouter;