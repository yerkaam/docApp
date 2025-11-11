import express from "express";
import { createAppointment, getAppointments } from "../controllers/appointment.controller.js";
import {paySimulate} from "../controllers/pay.controller.js";

const router = express.Router();

router.post('/', createAppointment);

// simulate payment -> create appointment after "payment"

// get appointments (with doctor/date filter)
router.get('/', getAppointments);
router.post('/pay-simulate', paySimulate);

export default router;
