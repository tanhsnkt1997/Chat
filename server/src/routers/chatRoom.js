import express from "express";
import {
  creat,
  getList,
  getListImg,
  getListVideoAudio,
  getListDoc,
  getListSearch,
  getAllMedia,
} from "../controllers/chatRoom.js";
const router = express.Router();

router.post("/creat", creat);
router.get("/list", getList);
router.get("/list/search", getListSearch);
router.get("/list_img/:id", getListImg);
router.get("/list_audio_video/:id", getListVideoAudio);
router.get("/list_doc/:id", getListDoc);
router.get("/get_all_media/:roomId/:messageId", getAllMedia);

export default router;
