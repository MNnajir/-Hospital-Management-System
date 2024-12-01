// routes/patientRoutes.js
const express = require('express');
const router = express.Router();


const {
    getAllPatients,
    getPatient,
    createPatient,
    updatePatient,
    deletePatient,
} = require('../Controllers/patientsController');


router.route('/patients')
.get(getAllPatients)
.post(createPatient);
router.route('/patients/:id').get(getPatient).put(updatePatient).delete(deletePatient);

module.exports = router;
