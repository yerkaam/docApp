import express from "express";
import { registerUser } from "../controllers/register.controller.js";
import { loginUser } from "../controllers/login.controller.js";
import {getProfile, updateProfile} from "../controllers/profile.controller.js";
import { authMiddleware } from "../auth.middleware.js";
import { verifyEmail } from "../controllers/verify.controller.js";
import { forgotPassword } from "../controllers/forgotPassword.controller.js";
import { resetPassword } from "../controllers/resetPassword.controller.js";
import {checkAuth} from "../controllers/checkAuth.controller.js";


const router = express.Router();
router.get("/check-auth", authMiddleware, checkAuth);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify", verifyEmail);
// защищённый маршрут
router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);


export default router;
