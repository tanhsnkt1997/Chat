import express from "express";
import { login, register, checkLogin, logout } from "../controllers/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/login_check", checkLogin);
router.get("/logout", logout);

export default router;
