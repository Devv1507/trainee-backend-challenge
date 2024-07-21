"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dbName = process.env.DB_DATABASE;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const sequelize = new sequelize_typescript_1.Sequelize({
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
    models: [__dirname + '/models'],
    logging: false
});
exports.default = sequelize;
//# sourceMappingURL=connection.js.map