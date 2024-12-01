// controllers/patientController.js
const Patient = require('../Models/patient');
const asyncWrapper = require('../middlerware/async')
const {createCustomAPIError} = require('../Error/custom-error');

// Get all patients
const getAllPatients = asyncWrapper(async (req, res,next) => {
    const patients = await Patient.find({});
    res.status(200).json({patients});
});

// Create a new patient
const createPatient = asyncWrapper(async (req, res,next) => {
    const { name ,age ,gender ,contactNumber ,address } = req.body;
        if (!name || !age || !address ||!contactNumber || !gender) {
            return next(new createCustomAPIError("Missing required fields", 404))
        }
    const patient = await Patient.create(req.body);
   res.status(201).json({patientId: patient._id, name, age, gender});
 });

// Get a single patient
const getPatient = asyncWrapper(async (req, res ,next) => {
    const {id: patientID} = req.params;
    const patient = await Patient.findOne({_id: patientID});
    if (!patient) {
        return next(new createCustomAPIError(`No patient with id:${patientID}`,404));
    }

    res.status(200).json({patient});
});

// Update a patient
const updatePatient = asyncWrapper(async (req, res,next) => {
    const {id: patientID} = req.params;
    const patient = await Patient.findOneAndUpdate({_id: patientID}, req.body, {
    new: true,
    runValidators: true
    });
    if (!patient) {
        return next( new createCustomAPIError(`No patien with id:${patientID}`,404));
    }
    // res.msessage and patient

    res.status(200).json({message:"successfully updated patientID",patient});

    
});

// Delete a patient
const deletePatient = asyncWrapper(async (req, res,next) => {
    const {id: patientID} = req.params;
    const patient = await Patient.findOneAndDelete({_id: patientID})
    if (!patient){
        return next(new createCustomAPIError(`No patient with id:${patientID}`,404));
    }
    res.status(200).json({message: "Patient deleted successfully"});
    //res.status(200).json({patient});
});
   

module.exports = { getAllPatients, getPatient, createPatient, updatePatient, deletePatient };
