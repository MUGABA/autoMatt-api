require("express-async-errors");
import express from "express";
import Customers from "../routes/customerroutes";

module.exports = (app) => {
  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));
  app.use("/", Customers);
};
