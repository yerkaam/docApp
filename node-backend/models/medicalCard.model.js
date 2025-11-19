import mongoose from "mongoose";

const medicalCardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    height: Number,
    weight: Number,
    bloodType: String,
    allergies: String,
    chronicDiseases: String
});

export default mongoose.model("MedicalCard", medicalCardSchema);
