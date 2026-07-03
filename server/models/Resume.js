const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        default: 'My Resume'
    },
    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        portfolio: String
    },
    summary: String,
    experience: [{
        title: String,
        company: String,
        location: String,
        startDate: Date,
        endDate: Date,
        current: Boolean,
        description: String
    }],
    education: [{
        degree: String,
        institution: String,
        location: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],
    skills: [String],
    atsScore: {
        type: Number,
        default: 0
    },
    pdfUrl: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
