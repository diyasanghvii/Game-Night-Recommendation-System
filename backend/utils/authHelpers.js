const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const generateJwtToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY);
};

module.exports = {
  hashPassword,
  comparePasswords,
  generateJwtToken,
};
