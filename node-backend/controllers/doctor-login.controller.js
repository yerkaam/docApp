import Doctor from "../models/doctor.model.js";

export const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const MASTER_PASSWORD = "doctor123";

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

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
