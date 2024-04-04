const CryptoJS = require('crypto-js');

const encryptData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(data, process.env.STEAM_SECRET_KEY).toString();
  return ciphertext;
};

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.STEAM_SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

module.exports = { encryptData, decryptData };