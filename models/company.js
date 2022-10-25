// company schema
const mongoose = require('mongoose')
//schema


var companySchema = new mongoose.Schema({
    name: String,
    description: String,
    address: String,
    phone: String,
    email: String,
    createdAt: { type: Date, default: Date.now },
    trucks: [{
        number: String,
        records: [{
            commandNr: String,
            commandDate: { type: Date.toLocaleDateString(), default: Date.now },
            creditNoteNr: String,
            creditNoteDate: { type: Date.toLocaleDateString(), default: Date.now },
            loadings: [{
                loadCompany: String,
                loadAddress: String
            }],
            unloadings: [{
                unloadCompany: String,
                unloadAddress: String
            }],
            paymentStatus: {
                type: String,
                default: "Not paid"
            },
            km: Number,
            price: Number

        }]
    }]
});

module.exports = mongoose.model('Company', companySchema);

