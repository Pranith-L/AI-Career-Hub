const express = require('express');
const { generateResume, mockInterviewQuestion } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/resume', generateResume);
router.post('/interview/question', protect, mockInterviewQuestion);

module.exports = router;
