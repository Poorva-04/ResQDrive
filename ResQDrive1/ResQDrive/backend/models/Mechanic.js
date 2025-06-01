const db = require('../config/dbConfig'); // Database connection

// Get mechanic count
const getMechanicCount = () => {
    return db.prepare("SELECT COUNT(*) AS count FROM mechanics").get().count;
};

// Get all mechanics
const getMechanics = () => {
    return db.prepare("SELECT * FROM mechanics").all();
};

// Get mechanic by ID
const getMechanicById = (id) => {
    return db.prepare("SELECT * FROM mechanics WHERE id = ?").get(id);
};

// Delete a mechanic by ID
const deleteMechanic = (id) => {
    return db.prepare("DELETE FROM mechanics WHERE id = ?").run(id);
};

module.exports = { getMechanicCount, getMechanics, getMechanicById, deleteMechanic };
