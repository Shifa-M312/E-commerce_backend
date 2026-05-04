const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/analyticsController');


router.get('/recommend/:productId', getRecommendations);

module.exports = router;
