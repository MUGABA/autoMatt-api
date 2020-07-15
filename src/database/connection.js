import mysql from "mysql";
// import config from "config";
import logger from "../utils/logger";

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "rashid",
  password: "Rashid@123",
  database: "automart",
  multipleStatements: true,
});

module.exports.connect = pool.getConnection(function (err, connection) {
  if (err) return logger.info("we could not connect to the database");

  logger.info("We successfully connected to the database");
});

module.exports = pool;
