import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "incorrect email" });

        if (!user.isVerified)
            return res.status(403).json({ message: "verify email" });

        if (user.password !== password)
            return res.status(400).json({ message: "incorrect password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

        res.cookie("token", token, {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000,
        });

        res.json({ message: "Успешный вход", user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error("Ошибка при логине:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
