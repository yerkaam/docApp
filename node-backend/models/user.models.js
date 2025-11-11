import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String }, // 6-значный код
    verificationExpires: { type: Date },
    resetCode: { type: String },
    resetExpires: { type: Date },// срок действия кода
}, { timestamps: true });

export default mongoose.model("User", userSchema);
