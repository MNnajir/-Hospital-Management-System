const express = require('express');
const router = express.Router();
const billingController = require('../Controllers/billingController');

// Create a billing record
router.post('/billing', billingController.createBilling);

// Get all billing records
router.get('/billing', billingController.getAllBilling);

// Get a single billing record by ID
router.get('/billing/:id', billingController.getBillingById);

// Update a billing record
router.put('/billing/:id', billingController.updateBilling);

// Delete a billing record
router.delete('/billing/:id', billingController.deleteBilling);

module.exports = router;
