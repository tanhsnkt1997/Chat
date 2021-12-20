import express from "express";
import {
  getListContact,
  getListReq,
  getListSearch,
  getListReqSearch,
} from "../controllers/contact.js";
const router = express.Router();

router.get("/list", getListContact);
router.get("/req_list", getListReq);
router.get("/list/search", getListSearch);
router.get("/req_list/search", getListReqSearch);

export default router;
