require('dotenv').config()
const connectDB = require('./db/connectdb.js');
const errorhandler = require('./middlerware/error-handler.js');
const asyncWrapper = require('./middlerware/async.js');
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

const express = require('express')
const app = express()
app.use(express.json())

app.use(errorhandler);
//router declares
const mainRouter = require('./Routes/patientRoutes.js');
const doctor = require('./Routes/doctorRoutes.js')
const user = require('./Routes/userRoutes.js')
const appiontment = require('./Routes/appointmentRoutes.js');
const billing = require('./Routes/billingRoutes.js');
const medicalRecord = require('./Routes/medicalRecordRoutes.js')
app.use('/api/v1/', doctor, billing, medicalRecord)
app.use('/api/v1/',mainRouter,user,appiontment)

const port = process.env.PORT 

const start = asyncWrapper(async () => {
  // try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
   //} catch (error) {
    //console.log('something is wrong');
  // }
});
start() 
