import express from "express";
const router = express.Router();
import { coronaInfo } from "../controllers/coronaInfo";

router.get("/", coronaInfo);

module.exports = router;
