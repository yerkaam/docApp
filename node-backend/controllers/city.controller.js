import City from "../models/city.model.js";

export const getCities = async (req, res) => {
    try {
        const cities = await City.find(); // получаем все города
        res.json(cities);
    } catch (error) {
        console.error("Ошибка при получении городов:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
