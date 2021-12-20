import express from "express";
import {
  creatMessageText,
  getListMessage,
  creatMessageFile,
  creatLike,
  creatReaction,
  creatMessageFileForward,
  removeMessage,
  getListSearchMessage,
  getDataSearch,
} from "../controllers/message.js";
const router = express.Router();

router.get("/get_list/:chatRoomID", getListMessage);
router.post("/creat_text", creatMessageText);
router.post("/creat_file", creatMessageFile);
router.post("/like", creatLike);
router.post("/creat_file_forward", creatMessageFileForward);
router.post("/sent-reaction", creatReaction);
router.delete("/remove/:messageId", removeMessage);
router.get("/get_list_search/:roomId", getListSearchMessage);
router.get("/get_data_search/:roomId/:messageId", getDataSearch);

export default router;
