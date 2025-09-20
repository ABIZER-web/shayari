const express = require('express');
const router = express.Router();
const { rateShayari } = require('../controllers/ratingController');

// POST /api/rating
router.post('/', rateShayari);

module.exports = router;
