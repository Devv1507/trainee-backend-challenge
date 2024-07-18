import { Sequelize } from 'sequelize';
import {DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER} from '../configs';

let connection: Sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default connection;