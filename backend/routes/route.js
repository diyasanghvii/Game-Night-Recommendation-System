const express = require("express");
const router = express.Router();

// controllers
const { getTest } = require("../controllers/testApi");

// api routes
router.get("/testApi", getTest);

module.exports = router;
