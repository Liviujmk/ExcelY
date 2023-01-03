//webhook schema
const mongoose = require('mongoose')

const webhookSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    description: String,
});

module.exports = mongoose.model('Webhook', webhookSchema);
