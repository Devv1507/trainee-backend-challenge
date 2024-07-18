// This file sets the configuration for database connection
import dotenv from 'dotenv';
dotenv.config();

interface Config {
  username: string | undefined;
  host: string | undefined;
  database: string | undefined;
  password: string | undefined;
  port: string | undefined;
  dialect: string;
  dialectOptions: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

const config: Config = {
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  dialect: 'postgresql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

export const development = config;
export const test = config;
export const production = config;