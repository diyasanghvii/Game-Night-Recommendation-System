const getTest = async (req, res) => {
  res.status(200).json({
    message: "Test API is Working",
  });
};

module.exports = { getTest };
