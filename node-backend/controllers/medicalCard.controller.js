import MedicalCard from "../models/medicalCard.model.js";

// Получить медкарту по userId
export const getMedicalCard = async (req, res) => {
    try {
        const card = await MedicalCard.findOne({ userId: req.params.userId });
        res.json(card || {});
    } catch (e) {
        res.status(500).json({ message: "Error fetching medical card" });
    }
};

// Обновить или создать (PATCH)
export const updateMedicalCard = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        const card = await MedicalCard.findOneAndUpdate(
            { userId },
            { $set: updates },
            { new: true, upsert: true } // создаст если нет
        );

        res.json({ message: "Updated successfully", card });
    } catch (e) {
        res.status(500).json({ message: "Error updating medical card" });
    }
};
