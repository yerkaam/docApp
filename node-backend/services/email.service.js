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

/**
 * Отправка email с подтверждением
 * @param {string} to - адрес получателя
 * @param {string} code - код подтверждения
 */
export const sendVerificationEmail = async (to, code) => {
    try {
        const info = await transporter.sendMail({
            from: `"DocApp" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Подтверждение регистрации",
            html: `
                <h2>Подтверждение аккаунта</h2>
                <p>Ваш код подтверждения:</p>
                <h1>${code}</h1>
                <p>Введите этот код на сайте для завершения регистрации.</p>
            `,
        });

        console.log("✅ Письмо отправлено:", info.response);
    } catch (error) {
        console.error("❌ Ошибка при отправке письма:", error);
        throw error;
    }
};
