const jwt = require("jsonwebtoken");
const User = require("../models/User/userModal");

const authoriseCheck = async (req, res, next) => {
  let token;
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get the token
      token = req.headers.authorization.split(" ")[1];
      // decode token
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Add user to req
      req.user = await User.findOne({ email: decode.email }).select(
        "-password"
      );

      next();
    } catch (e) {
      res.status(401).json({ message: "Not Authorised!" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not Authorised, No token!" });
  }
};

module.exports = { authoriseCheck };
