import db from "../connection";

const SellersModel = {
  async registerSellers(rawData) {
    return new Promise(async (resolve, reject) => {
      const text = `INSERT INTO sellers(email,first_name,last_name,password,address,contact)
      VALUES(
      "${rawData.email}",
      "${rawData.first_name}",
      "${rawData.last_name}",
      "${rawData.password}",
      "${rawData.address}",
      "${rawData.contact}"
      );
      SELECT * from sellers where seller_id=(SELECT LAST_INSERT_ID())`;
      await db.query(text, (err, rows, fields) => {
        if (!err) return resolve(rows[1][0]);
        return reject(err);
      });
    });
  },
  async getSpecificSeller(email) {
    return new Promise(async (resolve, reject) => {
      const text = `SELECT * FROM sellers WHERE email = ?`;
      await db.query(text, [email], (err, rows) => {
        if (!err) return resolve(rows);
        return reject(err);
      });
    });
  },
};

export default SellersModel;
