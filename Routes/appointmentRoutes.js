const express = require('express');
const router = express.Router();
const appointmentController = require('../Controllers/appointmentController'); // Adjust the path if necessary

// Create a new appointment
router.post('/appointments',  appointmentController.createAppointment);

// Get all appointments
router.get('/appointments', appointmentController.getAllAppointments);

// Get appointment by ID
router.get('/appointments/:id', appointmentController.getAppointmentById);

// Update appointment
router.put('/appointments/:id', appointmentController.updateAppointment);

// Delete appointment
router.delete('/appointments/:id', appointmentController.deleteAppointment);

module.exports = router;

