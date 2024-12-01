const Appointment = require('../Models/appointment');
const asyncWrapper = require('../middlerware/async');
const CustomAPIError = require('../Error/custom-error');

// Create a new appointment
exports.createAppointment = asyncWrapper(async (req, res, next) => {
    const { patientId, doctorId, appointmentDate, appointmentTime, status } = req.body;
    const newAppointment = new Appointment({
        patientId,
        doctorId,
        appointmentDate,
        appointmentTime,
        status
    });
    await newAppointment.save();
    res.status(201).json({ appointment: newAppointment });
});

// Get all appointments
exports.getAllAppointments = asyncWrapper(async (req, res, next) => {
    const appointments = await Appointment.find({}).populate('patientId').populate('doctorId'); 
    console.log("appointments")
    res.status(200).json({appointments});
    if (!appointments) {
        return next(new CustomAPIError("No appointments found!", 404));
    }
});

// Get appointment by ID
exports.getAppointmentById = asyncWrapper(async (req, res, next) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
        return next(new CustomAPIError("Appointment not found!", 404));
    }
    res.status(200).json({appointment});
});

// Update appointment
exports.updateAppointment = asyncWrapper(async (req, res, next) => {
    const { appointmentDate, appointmentTime, status } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { appointmentDate, appointmentTime, status },
        { new: true, runValidators: true }
    );
    if (!updatedAppointment) {
        return next(new CustomAPIError("Appointment not found!", 404));
    }
    res.status(200).json({ message: "Appointment updated successfully!", appointment: updatedAppointment });
});

// Delete appointment
exports.deleteAppointment = asyncWrapper(async (req, res, next) => {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
        return next(new CustomAPIError("Appointment not found!", 404));
    }
    res.status(200).json({ message: "Appointment deleted successfully!" });
});
