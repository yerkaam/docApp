import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        // 1️⃣ Получаем токен из cookies
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Нет токена. Доступ запрещён." });
        }

        // 2️⃣ Проверяем токен
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3️⃣ Добавляем данные пользователя в req.user
        req.user = decoded;

        // 4️⃣ Передаём дальше
        next();
    } catch (error) {
        console.error("Ошибка авторизации:", error);
        res.status(401).json({ message: "Неверный или истекший токен" });
    }
};
