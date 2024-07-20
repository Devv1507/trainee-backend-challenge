const crypto = require('crypto');

const generateRandomHex = () => {
  return crypto.randomBytes(64).toString('hex');
};

console.log(generateRandomHex());