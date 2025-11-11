import User from "../models/user.models.js";

export const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;

        // 1️⃣ Проверяем, что email и код переданы
        if (!email || !code) {
            return res.status(400).json({ message: "Email и код обязательны" });
        }

        // 2️⃣ Ищем пользователя по email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        // 3️⃣ Проверяем, не подтвержден ли уже email
        if (user.isVerified) {
            return res.status(400).json({ message: "Email уже подтверждён" });
        }

        // 4️⃣ Проверяем код
        if (user.verificationCode !== code) {
            return res.status(400).json({ message: "Неверный код подтверждения" });
        }

        // 5️⃣ Проверяем срок действия кода
        if (user.verificationExpires < Date.now()) {
            return res.status(400).json({ message: "Срок действия кода истёк" });
        }

        // 6️⃣ Подтверждаем email
        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationExpires = undefined;
        await user.save();

        // 7️⃣ Отправляем ответ
        res.json({ message: "✅ Email успешно подтверждён!" });
    } catch (error) {
        console.error("❌ Ошибка при подтверждении email:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
