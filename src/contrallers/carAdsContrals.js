import _ from "lodash";

import Cars from "../database/models/carAdsModel";
import validate from "../helpers/validations/carAdsValidations";
import { query } from "express";

const CarAdsContrals = {
  async reateCarAd(req, res) {
    const carDetails = _.pick(req.body, [
      "state",
      "price",
      "manufacturer",
      "model",
      "body_type",
    ]);

    const { error } = await validate.validateCarAds(carDetails);
    if (error)
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    console.log(carDetails.manufacturer);
    const createCarAd = await Cars.registerSellers(1, carDetails);

    return res.status(201).send({
      status: 201,
      data: createCarAd,
    });
  },
  async fetchSpecificCarAd(req, res) {
    const carId = req.params.car_id;

    const findCar = await Cars.getSpecificCarAd(carId);
    if (!findCar)
      return res.status(404).send({
        status: 404,
        message: "Car Ad your looking for does not exist",
      });

    return res.status(200).send({ status: 200, data: findCar });
  },
  async updateCarPrice(req, res) {
    const price = _.pick(req.body, ["price"]);
    const carId = req.params.car_id;

    const { error } = validate.validateCarPriceUpdate(price);
    if (error)
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });

    const findCarAd = await Cars.getSpecificCarAd(carId);
    if (!findCarAd)
      return res
        .status(404)
        .send({ status: 404, message: "Carad of that id is not found" });

    // we will check where the current user is the one who created the car ad they ought to update

    const updatePrice = await Cars.updatePriceOfSpecificCar(price.price, carId);
    return res.status(200).send({ status: 200, data: updatePrice });
  },
  async fetchCarsAdsThatAreAvailabe(req, res) {
    const status = _.pick(req.query, ["status"]);

    const { error } = await validate.validateGettingAvailableCars(status);
    if (error)
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });

    const getAllAvailbaleCars = await Cars.getCarsthatAreAvailabe(
      status.status
    );
    if (!getAllAvailbaleCars.length)
      return res
        .status(400)
        .send({ status: 400, message: "No cars available" });

    return res.status(200).send({ status: 200, data: getAllAvailbaleCars });
  },

  async getCarsAvailableBetweenAspecificPriceRange(req, res) {
    const query_strings = _.pick(req.query, [
      "status",
      "min_price",
      "max_price",
    ]);

    const { error } = await validate.validatePriceRange(query_strings);
    if (error)
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });

    const findAll = await Cars.getCarsthatAreAvailabeBetweenSpecicPriceRange(
      query_strings.status,
      query_strings.min_price,
      query_strings.max_price
    );

    if (!findAll.length)
      return res
        .status(400)
        .send({ status: 400, message: "No Cars within that price range" });

    return res.status(200).send({ status: 200, data: findAll });
  },
  async fetchAllCarsads(req, res) {
    const getAll = await Cars.getAllCarAds();
    if (!getAll.length)
      return res.status(400).send({ status: 400, message: "No car Ads Yet" });

    return res.status(200).send({ status: 200, data: getAll });
  },
};

export default CarAdsContrals;
