import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true },
    cityId: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    image: { type: String },
    email: { type: String },
});

export default mongoose.model("Doctor", doctorSchema);
