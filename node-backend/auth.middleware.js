import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Нет токена. Доступ запрещён." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        console.error("Ошибка авторизации:", error);
        res.status(401).json({ message: "Неверный или истекший токен" });
    }
};
