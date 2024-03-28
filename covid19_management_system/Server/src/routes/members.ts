import express from "express";
const router = express.Router();
import {
  getMembersDetails,
  addMember,
  deleteMember,
  updateMember,
} from "../controllers/members";

router.get("/", getMembersDetails);

router.post("/", addMember);

router.patch("/", updateMember);

router.delete("/:memberId", deleteMember);

module.exports = router;
