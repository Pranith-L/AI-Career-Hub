const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    targetRole: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Intermediate'
    },
    type: {
        type: String,
        enum: ['Technical', 'HR', 'Behavioral'],
        default: 'Technical'
    },
    questionsAndAnswers: [{
        question: String,
        userAnswer: String,
        aiFeedback: String,
        score: Number
    }],
    overallScore: {
        type: Number,
        default: 0
    },
    overallFeedback: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Interview', interviewSchema);
