import Appointment from "../models/appointment.model.js";

export const paySimulate = async (req, res) => {
    try {
        const { date, time, userId, doctorId, paymentInfo } = req.body;

        // проверяем, не занят ли слот
        const existing = await Appointment.findOne({ date, time, doctorId });
        if (existing) {
            return res.status(400).json({ message: "Слот уже занят" });
        }

        const appointment = new Appointment({ date, time, userId, doctorId, paymentInfo });
        await appointment.save();

        res.json({ message: "Оплата имитирована, слот забронирован ✅", appointment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
