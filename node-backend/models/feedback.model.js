import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    doctorId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    feedback: { type: String, required: true },
    rating: { type: Number, default: 0 }
});

const feedback = mongoose.model("Feedback", feedbackSchema);
export default feedback;
