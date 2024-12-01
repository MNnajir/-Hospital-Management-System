const Doctor = require('../Models/doctor');
const asyncWrapper = require('../middlerware/async')
const { CustomAPIError} = require('../Error/custom-error');

// Create a new doctor
exports.createDoctor = asyncWrapper(async (req, res) => {
        const doctor = await Doctor.create(req.body);
        res.status(201).json({doctor});
        if(!doctor){
            return next(CustomAPIError("Missing required fields",400));
        }
});

// Get all doctors
exports.getAllDoctors = asyncWrapper( async (req, res) => {
        const doctors = await Doctor.find({});
        res.status(200).json({doctors});
        if(!doctors){
            return next(CustomAPIError("No doctors found",404));
        }
});

// Get a single doctor by ID
exports.getDoctorById = asyncWrapper(async (req, res) => {
    const{id: doctorID } = req.params;
        const doctor = await Doctor.findOne({_id: doctorID});
        if(!doctor){
            return next(CustomAPIError(`No doctor found with id:${doctorID}` ,404));
            }
        res.status(200).json({doctor});
});

// Update a doctor
exports.updateDoctor = asyncWrapper( async (req, res) => {
        const{id:doctorID} = req.body;
        const doctor = await Doctor.findOneAndUpdate({id: doctorID}, req.body, {
             new: true,
             runValidators: true
            });
        if (!doctor) {
            return next(CustomAPIError(`No doctor found with id:${doctorID}`, 404));
            }
        res.status(200).json({doctor});
});

// Delete a doctor
exports.deleteDoctor = asyncWrapper(async (req, res) => {
        const{id: doctorID} = req.body;
        const doctor = await Doctor.findOneAndDelete({_id: doctorID});
        if (!doctor) {
            return next(CustomAPIError(`No doctor found with id:${doctorID}`, 404));
        }
        res.status(200).json({doctor})
});

// Add a schedule entry
exports.addSchedule =asyncWrapper( async (req, res) => {
        const{id: doctorID} = req.body;
        const doctor = await Doctor.findOne({_id: doctorID});
        if (!doctor) {
            return next(CustomAPIError(`No doctor found with id:${doctorID}`, 404));
        }
        doctor.schedule.push(req.body); // Add new schedule
        await doctor.save();
        res.status(200).json({doctor});
});

// Remove a schedule entry
exports.removeSchedule = asyncWrapper(async (req, res) => {
        const{id: doctorID} = req.body;
        const doctor = await Doctor.findOne({_id:doctorID});
        if (!doctor){
            return next(CustomAPIError(`No doctor found with id:${req.params.id}`, 404));
        }
            
        doctor.schedule = doctor.schedule.filter(
            (entry) => entry._id.toString() !== req.body.scheduleId
        ); // Remove by schedule ID
        await doctor.save();
        res.status(200).json({doctor});
    
});
