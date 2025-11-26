import express from "express";
import FeedbackModel from "../models/feedback.model.js";
import {createFeedback} from "../controllers/feedback.controller.js";

const router = express.Router();
router.post('/', createFeedback);
router.get("/:doctorId", async (req, res) => {
    try {
        const appointments = await FeedbackModel.find({
            doctorId: req.params.doctorId
        });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
