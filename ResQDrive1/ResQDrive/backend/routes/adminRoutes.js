// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// Route for getting count of users
router.get('/users/count', AdminController.getUserCount);

// Route for getting all users
router.get('/users', AdminController.getAllUsers);

// Route for getting a single user by ID
router.get('/users/:id', AdminController.getUserById);

// Route for deleting a user by ID
router.delete('/users/:id', AdminController.deleteUser);

// Route for updating a user by ID
router.put('/users/:id', AdminController.updateUser);

// Route for getting count of mechanics
router.get('/mechanics/count', AdminController.getMechanicCount);

// Route for getting all mechanics
router.get('/mechanics', AdminController.getAllMechanics);

// Route for getting a single mechanic by ID
router.get('/mechanics/:id', AdminController.getMechanicById);

// Route for deleting a mechanic by ID
router.delete('/mechanics/:id', AdminController.deleteMechanic);

// Route for updating a mechanic by ID
router.put('/mechanics/:id', AdminController.updateMechanic);

// Route for getting count of appointments
router.get('/appointments/count', AdminController.getAppointmentCount);

// Route for getting all appointments
router.get('/appointments', AdminController.getAllAppointments);

// Route for getting a single appointment by ID
router.get('/appointments/:id', AdminController.getAppointmentById);

// Route for deleting an appointment by ID
router.delete('/appointments/:id', AdminController.deleteAppointment);

// Route for updating an appointment by ID
router.put('/appointments/:id', AdminController.updateAppointment);

module.exports = router;
