import db from "./connection";
import logger from "../utils/logger";

const customers = {
  create: `CREATE TABLE IF NOT EXISTS customers (
    customer_id  INT AUTO_INCREMENT PRIMARY KEY,
    email  VARCHAR(255) NOT NULL UNIQUE,
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    address  VARCHAR(255) NOT NULL,
    contact  VARCHAR(255) NOT NULL
  );`,
  drop: `DROP TABLE IF EXISTS customers CASCADE;`,
};

const sellers = {
  create: `CREATE TABLE IF NOT EXISTS sellers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
  );`,
  drop: `DROP TABLE IF EXISTS sellers CASCADE;`,
};

const createTableCustomer = () => {
  return new Promise(async (resolve, reject) => {
    await db.query(customers.create, (err, rows, fields) => {
      if (!err) return resolve({ message: "customer table created" });
      return reject(err);
    });
  });
};
const dropTableCustomer = async () => {
  await db
    .query(customers.drop)
    .then((message) => {
      logger.info({
        message: `"customer table could not be deleted successfully${message}`,
      });
    })
    .catch((err) => {
      logger.info("something went wrongle while deleting customer table", err);
    });
};
export default {
  createTableCustomer,
  dropTableCustomer,
};
