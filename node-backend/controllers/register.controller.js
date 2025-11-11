import User from "../models/user.models.js";
import { sendVerificationEmail } from "../services/email.service.js";
import crypto from "crypto";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Пользователь уже существует" });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new User({
            name,
            email,
            password,
            verificationCode,
            verificationExpires: Date.now() + 10 * 60 * 1000,
            isVerified: false
        });

        await newUser.save();

        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({
            message: "Пользователь зарегистрирован. Код подтверждения отправлен на email.",
        });
    } catch (error) {
        console.error("❌ Ошибка при регистрации:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
