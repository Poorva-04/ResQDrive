const db = require('../config/dbConfig'); // Database connection

// Get appointment count
const getAppointmentCount = () => {
    return db.prepare("SELECT COUNT(*) AS count FROM appointments").get().count;
};

// Get all appointments
const getAppointments = () => {
    return db.prepare("SELECT * FROM appointments").all();
};

// Get appointment by ID
const getAppointmentById = (id) => {
    return db.prepare("SELECT * FROM appointments WHERE id = ?").get(id);
};

// Delete an appointment by ID
const deleteAppointment = (id) => {
    return db.prepare("DELETE FROM appointments WHERE id = ?").run(id);
};

module.exports = { getAppointmentCount, getAppointments, getAppointmentById, deleteAppointment };
