import Doctor from "../models/doctor.model.js";

export const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Один пароль на всех докторов
        const MASTER_PASSWORD = "doctor123";

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        // Ищем доктора по email
        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Проверяем пароль
        if (password !== MASTER_PASSWORD) {
            return res.status(401).json({ message: "Invalid password" });
        }

        return res.json({
            message: "Login success",
            doctor
        });

    } catch (err) {
        console.error("Doctor login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
