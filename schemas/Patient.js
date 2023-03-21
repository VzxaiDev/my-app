const mong = require('mongoose');

const PatientSchema = new mong.Schema({
    name: String,
    dob: Date,
    age: Number,
    patientID: Number,
    height: String,
    weight: String,
    gender: String,
    temp: Number,
    pulse: String,
    respiratoryRate: String,
    breathingSounds: String,
    bloodPressure: String,
    sPO2: String
});

module.exports = mong.model('patient', PatientSchema);