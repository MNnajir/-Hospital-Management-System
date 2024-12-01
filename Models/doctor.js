const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    specialization: { 
        type: String, 
        required: true
     },
     schedule: [
        {
            day: {
                type: String,
                required: true
            },
            startTime: {
                type: String,
            },
            endTime: {
                type: String,
            },
        },
     ],
},{timestamps:true,})
module.exports = mongoose.model('Doctor', DoctorSchema);