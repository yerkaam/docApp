import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from "./routes/user.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import cityRoutes from "./routes/city.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import medicalCardRoutes from "./routes/medicalCard.routes.js";
import doctorLoginRoutes from "./routes/doctor-login.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import aiRoutes from "./routes/ai.routes.js";
dotenv.config();
console.log("✅ EMAIL_USER:", process.env.EMAIL_USER);
console.log("✅ EMAIL_PASS:", process.env.EMAIL_PASS ? "Загружен" : "❌ НЕ загружен");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medical-card", medicalCardRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api", doctorLoginRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
