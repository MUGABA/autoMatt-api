import { Router } from "express";

import Customer from "../contrallers/customerContraller";
const router = Router();

router.get("/customers", Customer.getAllCustomers);

module.exports = router;
