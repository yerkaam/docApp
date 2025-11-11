import User from "../models/user.models.js";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json({
            message: "Доступ разрешён",
            user
        });
    } catch (error) {
        console.error("Ошибка при получении профиля:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json({
            message: "Профиль обновлён",
            user
        });
    } catch (error) {
        console.error("Ошибка при обновлении профиля:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
