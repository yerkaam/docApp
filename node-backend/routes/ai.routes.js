import express from "express";
import axios from "axios";
import Doctor from "../models/doctor.model.js"; // путь к модели

const router = express.Router();

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        // 1. AI ответ (общий текст)
        const aiResponse = await axios.post("http://localhost:11434/api/chat", {
            model: "llama3.2",
            messages: [{ role: "user", content: message }],
            stream: false
        });

        const textReply = aiResponse.data.message.content;

        // 2. Поиск врачей в базе
        const doctors = await Doctor.find(
            { $text: { $search: message } },
            { score: { $meta: "textScore" } }
        )
            .sort({ score: { $meta: "textScore" } })
            .limit(5);

        // Отправляем AI текст + список врачей
        res.json({ reply: textReply, doctors });
    } catch (error) {
        console.error("AI error:", error.response?.data || error);
        res.status(500).json({ message: "AI error" });
    }
});

export default router;
