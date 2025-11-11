import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    id: { type: String, required: true }, // твой собственный id, если ты не хочешь ObjectId
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true },
    cityId: { type: Number, required: true }, // связь с id города
    rating: { type: Number, default: 0 },
    availableTimes: { type: [String], default: [] },
    image: { type: String },
    about: { type: String }
});

export default mongoose.model("Doctor", doctorSchema);
