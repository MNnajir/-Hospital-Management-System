const Billing = require('../Models/billing'); 
const asyncWrapper = require('../middlerware/async');
const customError = require('../Error/custom-error')

// Create a new billing record
exports.createBilling = asyncWrapper(async (req, res, next) => {

        const { patientId, doctorId, services, totalAmount, paymentStatus } = req.body;

        const newBilling = new Billing({
            patientId,
            doctorId,
            services,
            totalAmount,
            paymentStatus
        });

        const savedBilling = await newBilling.save();
        res.status(201).json({billing: savedBilling });
});

// Get all billing records
exports.getAllBilling = asyncWrapper( async (req, res, next) => {
        const billings = await Billing.find().populate('patientId').populate('doctorId');
        res.status(200).json({billings});
        if(!billings){
            next(new customError('No billing records found', 404));
        }
    
});

// Get a single billing record by ID
exports.getBillingById = asyncWrapper(async (req, res, next) => {
        const { id } = req.params;
        const billing = await Billing.findById(id).populate('patientId').populate('doctorId');
        if (!billing) {
            return next(new customError('No billing record found with the given ID', 404));
        }
        res.status(200).json({billing});
});

// Update a billing record
exports.updateBilling = asyncWrapper(async (req, res, next) => {
        const { paymentStatus } = req.body;
        const updatedBilling = await Billing.findByIdAndUpdate(req.params.id, {paymentStatus} , {
             new: true,
             runValidators: true
         });
        if (!updatedBilling) {
            return next(new customError('No billing record found with the given ID', 404));
        }
        res.status(200).json({billing: updatedBilling});
});

// Delete a billing record
exports.deleteBilling = asyncWrapper(async (req, res, next) => {
        const { id } = req.params;
        const deletedBilling = await Billing.findByIdAndDelete(id);
        if (!deletedBilling) {
            return next(new customError('No billing record found with the given ID', 404));
        }
        res.status(200).json({ message: 'Billing record deleted successfully' });
});
