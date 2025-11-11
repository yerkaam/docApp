import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendTest() {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Проверка SMTP",
            text: "Если ты видишь это письмо — всё работает ✅",
        });

        console.log("✅ Письмо отправлено:", info.response);
    } catch (err) {
        console.error("❌ Ошибка:", err);
    }
}

sendTest();
