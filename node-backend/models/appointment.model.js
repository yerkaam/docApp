import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    userId: { type: String, required: true },
    doctorId: { type: String, required: true },
    paymentInfo: {
        method: String,
        account: String,
        name: String,
        comment: String
    },
    createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
