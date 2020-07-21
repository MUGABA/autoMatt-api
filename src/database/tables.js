import db from "./connection";

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
    seller_id INT AUTO_INCREMENT PRIMARY KEY,
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
const carAds = {
  create: `CREATE TABLE IF NOT EXISTS carads (
  car_id INT AUTO_INCREMENT PRIMARY KEY,
  owner INT REFERENCES sellers(seller_id) ON DELETE CASCADE,
  created_on TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  state  ENUM('new','used'),
  status  ENUM ('sold','available') DEFAULT 'available',
  price  FLOAT NOT NULL,
  manufacturer  VARCHAR(255),
  model  VARCHAR(255),
  body_type VARCHAR(255)
  );`,
  drop: `DROP TABLE IF EXISTS carads CASCADE;`,
};

const orders = {
  create: `CREATE TABLE IF NOT EXISTS orders ( 
  id  INT AUTO_INCREMENT PRIMARY KEY,
  buyer INT REFERENCES customers (customer_id) ON DELETE CASCADE,
  seller INT REFERENCES sellers (seller_id) ON DELETE CASCADE,
  car_id INT REFERENCES carads (car_id),
  amount  FLOAT NOT NULL,
  created_on TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  status ENUM('pending','accepted','rejected') DEFAULT 'pending'
  );`,
  drop: `DROP TABLE  IF EXISTS orders CASCADE;`,
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
  return new Promise(async (resolve, reject) => {
    await db.query(customers.drop, (err, rows, fields) => {
      if (!err)
        return resolve({ message: "customers table deleted sucessfully" });
      return reject(err);
    });
  });
};
const createTableSellers = () => {
  return new Promise(async (resolve, reject) => {
    await db.query(sellers.create, (err, rows, fields) => {
      if (!err) return resolve({ message: "sellers table created" });
      return reject(err);
    });
  });
};
const dropTableSellers = async () => {
  return new Promise(async (resolve, reject) => {
    await db.query(sellers.drop, (err, rows, fields) => {
      if (!err)
        return resolve({ message: "sellers table deleted successully" });
      return reject(err);
    });
  });
};

const createTableCarads = () => {
  return new Promise(async (resolve, reject) => {
    await db.query(carAds.create, (err, rows, fields) => {
      if (!err) return resolve({ message: "carads table created" });
      return reject(err);
    });
  });
};
const dropTableCarads = async () => {
  return new Promise(async (resolve, reject) => {
    await db.query(carAds.drop, (err, rows, fields) => {
      if (!err) return resolve({ message: "carads table deleted successully" });
      return reject(err);
    });
  });
};
const createTableOrders = () => {
  return new Promise(async (resolve, reject) => {
    await db.query(orders.create, (err, rows, fields) => {
      if (!err) return resolve({ message: "orders table created" });
      return reject(err);
    });
  });
};
const dropTableOrders = async () => {
  return new Promise(async (resolve, reject) => {
    await db.query(orders.drop, (err, rows, fields) => {
      if (!err) return resolve({ message: "orders table deleted successully" });
      return reject(err);
    });
  });
};
export default {
  createTableCustomer,
  dropTableCustomer,
  createTableSellers,
  dropTableSellers,
  createTableCarads,
  dropTableCarads,
  createTableOrders,
  dropTableOrders,
};
