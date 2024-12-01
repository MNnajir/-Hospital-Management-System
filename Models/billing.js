const mongoose = require('mongoose')

const BillingSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
   doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
   },
   services: [{
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
   }],
   totalAmount:{
    type:Number,
    required:true
   },
   paymentStatus:{
    type:String,
    enum: ["paid", "pending"],
    default: "pending",
    },
},{timestamps:true,})
module.exports = mongoose.model('Billing', BillingSchema);