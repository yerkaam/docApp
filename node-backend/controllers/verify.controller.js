import User from "../models/user.models.js";

export const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ message: "Email и код обязательны" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "Email уже подтверждён" });
        }

        if (user.verificationCode !== code) {
            return res.status(400).json({ message: "Неверный код подтверждения" });
        }

        if (user.verificationExpires < Date.now()) {
            return res.status(400).json({ message: "Срок действия кода истёк" });
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationExpires = undefined;
        await user.save();

        res.json({ message: "✅ Email успешно подтверждён!" });
    } catch (error) {
        console.error("❌ Ошибка при подтверждении email:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
