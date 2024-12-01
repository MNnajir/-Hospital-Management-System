const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
     },
     gender: {
        type: String,
        enum:['male', 'female', 'other'],
        required: true
     },
     contactNumber: { 
        type: String,
        required: true
    },
    address: {
        type: String,
    },

},{timestamps:true,})

module.exports = mongoose.model('Patient', PatientSchema);