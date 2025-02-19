const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required:true
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
     },
     appointmentDate:{
        type:Date,
        required:true
    },
    appointmentTime:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","confirmed","cancelled"],
        default:"pending"
     },
},
{
    timestamps:true,
})
module.exports = mongoose.model("Appointment",AppointmentSchema);