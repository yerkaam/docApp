import express from "express";
import { getMedicalCard, updateMedicalCard } from "../controllers/medicalCard.controller.js";

const router = express.Router();
router.get("/:userId", getMedicalCard);
router.patch("/:userId", updateMedicalCard);

export default router;
