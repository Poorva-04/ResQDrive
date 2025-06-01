// backend/controllers/adminController.js
const db = require('../config/dbConfig'); // SQLite database connection

// Get the count of users
exports.getUserCount = async (req, res) => {
    try {
        const result = db.prepare('SELECT COUNT(*) AS count FROM users').get();
        res.json({ count: result.count });
    } catch (err) {
        console.error('Error fetching user count:', err);
        res.status(500).json({ error: 'Failed to fetch user count' });
    }
};

// Get the count of mechanics
exports.getMechanicCount = async (req, res) => {
    try {
        const result = db.prepare('SELECT COUNT(*) AS count FROM mechanics').get();
        res.json({ count: result.count });
    } catch (err) {
        console.error('Error fetching mechanic count:', err);
        res.status(500).json({ error: 'Failed to fetch mechanic count' });
    }
};

// Get the count of appointments
exports.getAppointmentCount = async (req, res) => {
    try {
        const result = db.prepare('SELECT COUNT(*) AS count FROM appointments').get();
        res.json({ count: result.count });
    } catch (err) {
        console.error('Error fetching appointment count:', err);
        res.status(500).json({ error: 'Failed to fetch appointment count' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = db.prepare('SELECT * FROM users').all();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const stmt = db.prepare('DELETE FROM users WHERE id = ?');
        const result = stmt.run(id);
        if (result.changes > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, userType } = req.body;
    try {
        const stmt = db.prepare('UPDATE users SET name = ?, email = ?, userType = ? WHERE id = ?');
        const result = stmt.run(name, email, userType, id);
        if (result.changes > 0) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Get all mechanics
exports.getAllMechanics = async (req, res) => {
    try {
        const mechanics = db.prepare('SELECT * FROM mechanics').all();
        res.json(mechanics);
    } catch (err) {
        console.error('Error fetching mechanics:', err);
        res.status(500).json({ error: 'Failed to fetch mechanics' });
    }
};

// Get a mechanic by ID
exports.getMechanicById = async (req, res) => {
    const { id } = req.params;
    try {
        const mechanic = db.prepare('SELECT * FROM mechanics WHERE id = ?').get(id);
        if (mechanic) {
            res.json(mechanic);
        } else {
            res.status(404).json({ message: 'Mechanic not found' });
        }
    } catch (err) {
        console.error('Error fetching mechanic:', err);
        res.status(500).json({ error: 'Failed to fetch mechanic' });
    }
};

// Delete a mechanic by ID
exports.deleteMechanic = async (req, res) => {
    const { id } = req.params;
    try {
        const stmt = db.prepare('DELETE FROM mechanics WHERE id = ?');
        const result = stmt.run(id);
        if (result.changes > 0) {
            res.status(200).json({ message: 'Mechanic deleted successfully' });
        } else {
            res.status(404).json({ message: 'Mechanic not found' });
        }
    } catch (err) {
        console.error('Error deleting mechanic:', err);
        res.status(500).json({ error: 'Failed to delete mechanic' });
    }
};

// Update a mechanic by ID
exports.updateMechanic = async (req, res) => {
    const { id } = req.params;
    const { name, vehicleType, availability } = req.body;
    try {
        const stmt = db.prepare('UPDATE mechanics SET name = ?, vehicleType = ?, availability = ? WHERE id = ?');
        const result = stmt.run(name, vehicleType, availability, id);
        if (result.changes > 0) {
            res.status(200).json({ message: 'Mechanic updated successfully' });
        } else {
            res.status(404).json({ message: 'Mechanic not found' });
        }
    } catch (err) {
        console.error('Error updating mechanic:', err);
        res.status(500).json({ error: 'Failed to update mechanic' });
    }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = db.prepare('SELECT * FROM appointments').all();
        res.json(appointments);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
};

// Get an appointment by ID
exports.getAppointmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
        if (appointment) {
            res.json(appointment);
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (err) {
        console.error('Error fetching appointment:', err);
        res.status(500).json({ error: 'Failed to fetch appointment' });
    }
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const stmt = db.prepare('DELETE FROM appointments WHERE id = ?');
        const result = stmt.run(id);
        if (result.changes > 0) {
            res.status(200).json({ message: 'Appointment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (err) {
        console.error('Error deleting appointment:', err);
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
};

// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { userId, mechanicId, status } = req.body;
    try {
        const stmt = db.prepare('UPDATE appointments SET userId = ?, mechanicId = ?, status = ? WHERE id = ?');
        const result = stmt.run(userId, mechanicId, status, id);
        if (result.changes > 0) {
            res.status(200).json({ message: 'Appointment updated successfully' });
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (err) {
        console.error('Error updating appointment:', err);
        res.status(500).json({ error: 'Failed to update appointment' });
    }
};
