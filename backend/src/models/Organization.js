const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
});

module.exports = mongoose.model('Organization', OrganizationSchema);
