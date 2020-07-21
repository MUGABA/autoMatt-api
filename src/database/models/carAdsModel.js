import db from "../connection";

const CarAdsModel = {
  async registerSellers(owner, rawData) {
    return new Promise(async (resolve, reject) => {
      const text = `INSERT INTO carads (owner,state,price,manufacturer,model,body_type)
      VALUES(
      "${owner}",
      "${rawData.state}",
      "${rawData.price}",
      "${rawData.manufacturer}",
      "${rawData.model}",
      "${rawData.body_type}"
      );
      SELECT * from carads where car_id=(SELECT LAST_INSERT_ID())`;
      await db.query(text, (err, rows, fields) => {
        if (!err) return resolve(rows[1][0]);
        return reject(err);
      });
    });
  },
  async getSpecificCarAd(id) {
    return new Promise(async (resolve, reject) => {
      const text = `SELECT * FROM carads WHERE car_id = ?`;
      await db.query(text, [id], (err, rows, fields) => {
        if (!err) return resolve(rows[0]);
        return reject(err);
      });
    });
  },
  async updatePriceOfSpecificCar(price, id) {
    return new Promise(async (resolve, reject) => {
      const text = `UPDATE carads SET price = ? WHERE  car_id = ?;
      SELECT * FROM carads WHERE car_id = "${id}";`;
      await db.query(text, [price, id], (err, rows, fields) => {
        if (!err) return resolve(rows[1][0]);
        return reject(err);
      });
    });
  },
  async getCarsthatAreAvailabe(status) {
    return new Promise(async (resolve, reject) => {
      const text = `SELECT * FROM carads WHERE status = ?`;
      await db.query(text, [status], (err, rows, fields) => {
        if (!err) return resolve(rows);
        return reject(err);
      });
    });
  },
  async getCarsthatAreAvailabeBetweenSpecicPriceRange(
    status,
    min_price,
    max_price
  ) {
    return new Promise(async (resolve, reject) => {
      const text = `SELECT * FROM carads WHERE status = ? AND price BETWEEN ? AND ?;`;
      await db.query(
        text,
        [status, min_price, max_price],
        (err, rows, fields) => {
          if (!err) return resolve(rows);
          return reject(err);
        }
      );
    });
  },
  getAllCarAds() {
    return new Promise(async (resolve, reject) => {
      const text = "SELECT * FROM carads;";
      await db.query(text, (err, rows) => {
        if (!err) return resolve(rows);
        return reject(err);
      });
    });
  },
};

export default CarAdsModel;
