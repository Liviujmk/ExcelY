// company schema
const mongoose = require('mongoose')
//schema


var companySchema = new mongoose.Schema({
    name: String,
    description: String,
    address: String,
    phone: String,
    email: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);

