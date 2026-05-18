const express = require('express');
const router = express.Router();
const { getRecommendation } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/recommend', authMiddleware, getRecommendation);

module.exports = router;
