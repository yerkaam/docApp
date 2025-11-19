import express from "express";
import {createAppointment, getAppointmentByUserId, getAppointments} from "../controllers/appointment.controller.js";
import {paySimulate} from "../controllers/pay.controller.js";
import Appointment from "../models/appointment.model.js";

const router = express.Router();

router.post('/', createAppointment);

// simulate payment -> create appointment after "payment"

// get appointments (with doctor/date filter)
router.get('/', getAppointments);
router.get('/user/:userId', getAppointmentByUserId);
router.get("/doctor/:doctorId", async (req, res) => {
    try {
        const appointments = await Appointment.find({
            doctorId: req.params.doctorId
        });

        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/pay-simulate', paySimulate);

export default router;
