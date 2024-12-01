const mongoose = require("mongoose");


const MedicalRecordSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    diagnosis: { 
        type: String,
         required: true 
        },
  treatment: {
     type: String 
    },
  prescription: [
    { 
        type: String 
    }], // List of medications
  notes: { 
    type: String 
},
visitDate: { 
    type: Date, 
    default: Date.now 
},
})
module.exports  = mongoose.model("MedicalRecord", MedicalRecordSchema);
