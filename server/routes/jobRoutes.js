const express = require('express');
const { getJobs, seedJobs, searchRealJobs } = require('../controllers/jobController');
const router = express.Router();

router.get('/', getJobs);
router.get('/search', searchRealJobs);   // Real jobs from Jsearch (LinkedIn/Indeed)
router.post('/seed', seedJobs);

module.exports = router;
