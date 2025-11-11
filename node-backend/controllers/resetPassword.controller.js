import User from "../models/user.models.js";

export const resetPassword = async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        if (user.resetCode !== code) {
            return res.status(400).json({ message: "Неверный код" });
        }

        if (user.resetExpires < Date.now()) {
            return res.status(400).json({ message: "Код истёк" });
        }

        user.password = newPassword;
        user.resetCode = undefined;
        user.resetExpires = undefined;
        await user.save();



        res.json({ message: "✅ Пароль успешно сброшен" });
    } catch (error) {
        console.error("Ошибка при сбросе пароля:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
