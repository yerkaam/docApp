import Appointment from "../models/appointment.model.js";

export const createAppointment = async (req, res) => {
    try {
        const { date, time, userId, doctorId } = req.body;

        if (!date || !time || !userId || !doctorId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existing = await Appointment.findOne({ date, time, doctor: doctorId });
        if (existing) {
            return res.status(409).json({ message: "This slot is already booked for this doctor" });
        }

        const appointment = new Appointment({ date, time, user: userId, doctor: doctorId });
        await appointment.save();

        res.status(201).json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAppointmentByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const appointments = await Appointment.find({ userId });

        console.log('Appointments for user:', userId, appointments);

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Ошибка при получении записей:", error);
        res.status(500).json({ message: "Error fetching appointments" });
    }
};

export const getAppointments = async (req, res) => {
    try {
        const { doctor, date } = req.query;

        if (!doctor || !date) {
            return res.status(400).json({ message: "Doctor and date are required" });
        }
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const appointments = await Appointment.find({
            doctorId: doctor,
            date: { $gte: startOfDay, $lte: endOfDay }
        }).sort({ time: 1 });

        console.log("📅 Найдено записей:", appointments.length);
        res.json(appointments);
    } catch (error) {
        console.error("Ошибка при получении записей:", error);
        res.status(500).json({ message: "Error fetching appointments" });
    }
};
export const getAppointmentsByDoctorID = async (req, res) => {
    try {
        const { doctorId } = req.query;

        if (!doctorId) {
            return res.status(400).json({ message: "Doctor is required" });
        }
        const appointments = await Appointment.find({
            doctorId: doctorId,
        }).sort({ time: 1 });
        console.log("📅 Найдено записей:", appointments.length);
        res.json(appointments);
    } catch (error) {
        console.error("Ошибка при получении записей:", error);
        res.status(500).json({ message: "Error fetching appointments" });
    }
};





