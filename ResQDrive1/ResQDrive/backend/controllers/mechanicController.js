const db = require('../config/dbConfig');

const getMechanicsByVehicleType = (req, res) => {
  const { vehicleType } = req.query;

  if (!vehicleType) {
    return res.status(400).json({ message: 'Vehicle type is required' });
  }

  try {
    const stmt = db.prepare(`
      SELECT id, name, email, phone, address, specialization 
      FROM mechanics 
      WHERE LOWER(specialization) = LOWER(?)  // Ensure case-insensitive match
    `);
    const mechanics = stmt.all(vehicleType); // Passing the vehicleType parameter here

    // If no mechanics found, send an appropriate message
    if (mechanics.length === 0) {
      return res.status(404).json({ message: 'No mechanics found for the specified vehicle type.' });
    }

    res.status(200).json(mechanics);
  } catch (error) {
    console.error('Error fetching mechanics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getMechanicsByVehicleType,
};
