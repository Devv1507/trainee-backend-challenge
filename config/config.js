require('ts-node/register');
const configs = require('../configs.ts');

module.exports = {
  "username": configs.DB_USER,
  "password": configs.DB_PASSWORD,
  "database": configs.DB_DATABASE,
  "host": configs.DB_HOST,
  "dialect": "postgres",
  "dialectOptions": {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};