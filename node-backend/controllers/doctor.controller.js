import Doctor from "../models/doctor.model.js";
import mongoose from "mongoose";

export const getDoctors = async (req, res) => {
    try {
        const { cityId, specialty } = req.query;
        const filter = {};

        if (cityId) filter.cityId = Number(cityId); // ✅ теперь строки совпадают
        if (specialty) filter.specialty = new RegExp(specialty, "i");

        const doctors = await Doctor.find(filter);
        res.json(doctors);
    } catch (err) {
        console.error("Ошибка при получении докторов:", err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
