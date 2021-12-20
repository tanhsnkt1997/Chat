import express from "express";
import {
  getListGroup,
  getListSearch,
  changeName,
  changeAvatar,
  leaveRoom,
  addContactToRoom,
  getListContactOuterRoom,
} from "../controllers/group.js";
const router = express.Router();

router.get("/list", getListGroup);
router.get("/list/search", getListSearch);
router.patch("/setting/change_name_group", changeName);
router.patch("/setting/change_avatar_group", changeAvatar);
router.get("/list_member_outer/:id", getListContactOuterRoom);
router.post("/add_member_group", addContactToRoom);
router.delete("/setting/leaveRoom/:groupId", leaveRoom);

export default router;
