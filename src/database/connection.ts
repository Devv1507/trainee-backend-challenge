import { Sequelize } from 'sequelize-typescript';

const dbName = process.env.DB_DATABASE as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

const connection = new Sequelize({
  database: dbName,
  username: dbUser,
  password: dbPassword,
  host: dbHost,
  dialect: 'postgres',
  port: Number(process.env.DB_PORT),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  models: [__dirname + '/../models'],
});

export default connection;
