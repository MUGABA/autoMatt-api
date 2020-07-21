require("express-async-errors");
import express from "express";
import Customers from "../routes/customerroutes";
import Sellers from "../routes/sellerRoutes";
import Cars from "../routes/carRoutes";

module.exports = (app) => {
  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));
  app.use("/", Customers);
  app.use("/sellers/", Sellers);
  app.use("/cars", Cars);
};
