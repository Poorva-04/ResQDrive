const express = require('express');
const router = express.Router();

const {
    bookAppointment,
    getAppointmentById,
    getMechanicAppointments,
    updateAppointmentStatus
} = require('../controllers/appointmentController');

const verifyToken = require('../middlewares/verifyToken');
const authenticateToken = require('../middlewares/authMiddleware');

// ✅ Book an appointment
router.post('/book', verifyToken, bookAppointment);

// ✅ Get mechanic-specific appointments (more specific path FIRST)
router.get('/mechanics/:mechanicId/appointments', authenticateToken, getMechanicAppointments);

// ✅ Update appointment status
router.put('/:appointment_id/status', authenticateToken, updateAppointmentStatus); // Use appointment_id

// ✅ Get appointment by ID (generic route LAST)
router.get('/:appointment_id', getAppointmentById);

module.exports = router;
