const express = require('express')
const router = express.Router();

const {
    createDoctor, 
    getAllDoctors, 
    getDoctorById, 
    updateDoctor, 
    deleteDoctor, 
    addSchedule,
    removeSchedule 
} = require('../Controllers/doctorController')

router.route('/doctors')
.post(createDoctor)
.get(getAllDoctors)
router.route('/doctors/:id')
.get(getDoctorById)
.put(updateDoctor)
.delete(deleteDoctor)
router.route('/doctors/:id/schedule')
.post(addSchedule)
.delete(removeSchedule)
module.exports = router;