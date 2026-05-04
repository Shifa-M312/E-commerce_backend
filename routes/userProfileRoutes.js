const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getProfile } = require('../controllers/userProfile');

router.get('/me', protect, getProfile);
module.exports = router;
