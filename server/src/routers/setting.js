import express from "express";
import { updateProfile, updateAvatar } from "../controllers/setting.js";
const router = express.Router();

router.post("/update_profile", updateProfile);
router.post("/update_avatar", updateAvatar);

export default router;
