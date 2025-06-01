const db = require('../config/dbConfig');
const { v4: uuidv4 } = require('uuid');

// ✅ Book an appointment
const bookAppointment = (req, res) => {
  const { userName, mechanicId, vehicle, problem, appointment_date, status } = req.body;

  if (!userName || !mechanicId || !vehicle || !problem || !appointment_date || !status) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const appointment_id = `APT-${Date.now().toString(36)}`;

  try {
    const stmt = db.prepare(`
      INSERT INTO appointments 
      (appointment_id, userName, mechanicId, vehicle, problem, appointment_date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(appointment_id, userName, mechanicId, vehicle, problem, appointment_date, status);

    res.status(201).json({
      message: "Appointment booked successfully.",
      appointment_id
    });
  } catch (error) {
    console.error("❌ Error booking appointment:", error);
    res.status(500).json({ message: "Server error. Failed to book appointment." });
  }
};

// ✅ Get appointment by appointment ID
const getAppointmentById = (req, res) => {
  const { appointment_id } = req.params;

  try {
    const stmt = db.prepare(`SELECT * FROM appointments WHERE appointment_id = ?`);
    const appointment = stmt.get(appointment_id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error("❌ Error fetching appointment:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// ✅ Get appointments for a specific mechanic
const getMechanicAppointments = (req, res) => {
  const mechanicId = req.params.mechanicId;

  try {
    const stmt = db.prepare(`SELECT * FROM appointments WHERE mechanicId = ?`);
    const appointments = stmt.all(mechanicId);

    res.json(appointments);
  } catch (error) {
    console.error("🔥 DB Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Update appointment status by appointment ID
const updateAppointmentStatus = (req, res) => {
  const { appointment_id } = req.params; // Updated to match route parameter
  const { status } = req.body;

  const allowedStatuses = ["Accepted", "Completed ", "Rejected"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status update" });
  }

  try {
    const stmt = db.prepare(`
      UPDATE appointments
      SET status = ?
      WHERE appointment_id = ?
    `);

    const result = stmt.run(status, appointment_id); // Use appointment_id here

    if (result.changes === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Export all controller functions
module.exports = {
  bookAppointment,
  getAppointmentById,
  getMechanicAppointments,
  updateAppointmentStatus,
};
