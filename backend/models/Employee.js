const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    skills: { type: [String], required: true },
    performanceScore: { type: Number, required: true, min: 0, max: 100 },
    experience: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
