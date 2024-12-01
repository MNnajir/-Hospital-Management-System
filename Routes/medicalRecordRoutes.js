const express = require("express");
const router = express.Router();
const medicalRecordController = require("../Controllers/medicalRecordController");

// Create a new medical record
router.post("/medicalRecord", medicalRecordController.createMedicalRecord);

// Get all medical records
router.get("/medicalRecord", medicalRecordController.getAllMedicalRecords);

// Get a specific medical record by ID
router.get("/medicalRecord/:id", medicalRecordController.getMedicalRecordById);

// Update a medical record by ID
router.put("/medicalRecord/:id", medicalRecordController.updateMedicalRecord);

// Delete a medical record by ID
router.delete("/medicalRecord/:id", medicalRecordController.deleteMedicalRecord);

module.exports = router;
