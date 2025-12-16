import Doctor from "../models/doctor.model.js";
import MedicalCard from "../models/medicalCard.model.js";

export const getDoctors = async (req, res) => {
    try {
        const { cityId, specialty } = req.query;
        const filter = {};

        if (cityId) filter.cityId = Number(cityId);
        if (specialty) filter.specialty = new RegExp(specialty, "i");

        const doctors = await Doctor.find(filter);
        res.json(doctors);
    } catch (err) {
        console.error("Ошибка при получении докторов:", err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
export const updateRating = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const doctor = await Doctor.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, upsert: true }
        );

        res.json( doctor );
    } catch (e) {
        console.error("UpdateRating Error:", e);
        res.status(500).json({ message: "Error updating doctor", error: e.message });
    }
};
