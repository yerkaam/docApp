import express from "express";
import { getDoctors } from "../controllers/doctor.controller.js";
import Doctor from "../models/doctor.model.js"; // ✅ добавили импорт

const router = express.Router();

router.get("/", getDoctors);

router.get("/:id", async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
