import { Router } from "express";
import SellersContrals from "../contrallers/sellersContrallers";

const router = Router();

router.post("/register", SellersContrals.registerSeller);
router.post("/login", SellersContrals.signInSeller);

export default router;
