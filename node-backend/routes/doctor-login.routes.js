import express from "express";
import { doctorLogin } from "../controllers/doctor-login.controller.js";

const router = express.Router();

router.post("/doctor-login", doctorLogin);

export default router;
