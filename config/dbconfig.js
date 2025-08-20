// config/dbconfig.js
require("dotenv").config();

const {
  DB_URL,
  DB_HOST,
  DB_PORT = "3306",
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_DIALECT = "mysql",
  DB_SSL = "0",
} = process.env;

module.exports = {
  // Prefer a single URL if provided (useful on Railway/PlanetScale/etc.)
  url: DB_URL || null,
 
  // Discrete params (used if DB_URL is not set)
  HOST: DB_HOST,
  PORT: DB_PORT,
  USER: DB_USER,
  PASSWORD: DB_PASS,
  DB: DB_NAME,
  dialect: DB_DIALECT,

  // Some hosted MySQLs require SSL
  dialectOptions:
    DB_SSL === "1"
      ? {
          ssl: {
            require: true,
            // Many managed DBs use self-signed certs; disable strict cert check
            rejectUnauthorized: false,
          },
        }
      : {},

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
