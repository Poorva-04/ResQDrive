// routes/mechanicRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// GET /api/mechanics?vehicleType=Car
router.get('/', (req, res) => {
  const { vehicleType } = req.query;

  if (!vehicleType) {
    return res.status(400).json({ message: "Vehicle type is required" });
  }

  try {
    const stmt = db.prepare(`
      SELECT id, name, email, phone, address, vehicleType 
      FROM mechanics 
      WHERE LOWER(vehicleType) = LOWER(?)
    `);
    const mechanics = stmt.all(vehicleType);
    res.json(mechanics);
  } catch (err) {
    console.error("Error fetching mechanics:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
