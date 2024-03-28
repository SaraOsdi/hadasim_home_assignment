import express from "express";
const router = express.Router();

router.use("/members", require("./routes/members.ts"));
router.use("/coronaInfo", require("./routes/coronaInfo.ts"));

module.exports = router;
