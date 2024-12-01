const MedicalRecord = require("../Models/medicalRecord");
const asyncWrapper = require("../middlerware/async")
const customAPIError = require("../Error/custom-error")

// Create a new medical record
exports.createMedicalRecord = asyncWrapper(async (req, res, next) => {
        const newRecord = new MedicalRecord(req.body);
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    
});
// Get all medical records
exports.getAllMedicalRecords = asyncWrapper(async (req, res, next) => {
        const records = await MedicalRecord.find().populate("patientId","id:_id, name, age, gender").populate("doctorId");
        res.status(200).json({records});
    
});

// Get a specific medical record by ID
exports.getMedicalRecordById = asyncWrapper(async (req, res, next) => {
    
        const record = await MedicalRecord.findById(req.params.id).populate("patientId").populate("doctorId");
        if (!record) {
            return next(new customAPIError("No record found with the given ID", 404));
        }
        res.status(200).json(record);
});

// Update a medical record
exports.updateMedicalRecord = asyncWrapper(async (req, res, next) => {
        const updatedRecord = await MedicalRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedRecord){
            return next(new customAPIError("No record found with the given ID", 404));
        }
        res.status(200).json(updatedRecord);
    
});

// Delete a medical record
exports.deleteMedicalRecord = asyncWrapper(async (req, res, next) => {
        const deletedRecord = await MedicalRecord.findByIdAndDelete(req.params.id);
        if (!deletedRecord){
            return next(new customAPIError("No record found with the given ID", 404));
        }
        res.status(200).json({ message: "Medical record deleted successfully" });
});
