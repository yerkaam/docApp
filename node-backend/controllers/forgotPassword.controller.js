import User from "../models/user.models.js";
import { transporter } from "../config/email.js";

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "email already exists" });
        }

        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetCode = resetCode;
        user.resetExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "reset password",
            text: `Your code for reset password: ${resetCode}`,
        });

        res.json({ message: "code was send" });
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ message: "error server" });
    }
};
