import { Router } from "express";

import CarConrals from "../contrallers/carAdsContrals";

const router = Router();
router.get("/range/", CarConrals.getCarsAvailableBetweenAspecificPriceRange);
router.post("/create", CarConrals.reateCarAd);
router.get("/", CarConrals.fetchAllCarsads);
router.get("/:car_id", CarConrals.fetchSpecificCarAd);
router.delete("/:car_id", CarConrals.deleteSpecificCar);
router.patch("/:car_id/price", CarConrals.updateCarPrice);
router.get("/", CarConrals.fetchCarsAdsThatAreAvailabe);

export default router;
