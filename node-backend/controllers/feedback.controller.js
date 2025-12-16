import FeedbackModel from "../models/feedback.model.js";
export const getFeedback = async (req, res) => {
    try {
        const { doctorId } = req.query;

        if (!doctorId) {
            return res.status(400).json({ message: "Doctor is required" });
        }
        const feedback = await FeedbackModel.find({
            doctorId: doctorId,
        }).sort({ time: 1 });
        console.log( feedback.length);
        res.json(feedback);
    } catch (error) {
        console.error("Ошибка при получении записей:", error);
        res.status(500).json({ message: "Error fetching appointments" });
    }
};
export const createFeedback = async (req, res) => {
    try {
        const { userId, doctorId, feedback, rating } = req.body;

        if (!feedback || !userId || !doctorId || !rating) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const feedbackPost = new FeedbackModel({ feedback: feedback, userId: userId, doctorId: doctorId, rating: rating });
        await feedbackPost.save();

        res.status(201).json(feedbackPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};