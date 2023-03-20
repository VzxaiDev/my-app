const mong = require('mongoose');

const PatientSchema = new mong.Schema({
    name: String,
    hasCancer: Boolean
});

module.exports = mong.model('patient', PatientSchema);