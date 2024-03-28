import express from "express";
const router = express.Router();
import {
  getMembersDetails,
  addMember,
  deleteMember,
  updateMember,
  addMemberImage
} from "../controllers/members";
import { upload } from "../middlewares/multer";

router.get("/", getMembersDetails);

router.post("/", addMember);

router.post("/image", upload.single('image'), addMemberImage);

router.patch("/", updateMember);

router.delete("/:memberId", deleteMember);

module.exports = router;
