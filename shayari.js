const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addShayari, getAllShayaris } = require('../controllers/shayariController');

// POST /api/shayari/ - Add Shayari (logged-in users)
router.post('/', auth, addShayari);

// GET /api/shayari/ - Public list of all Shayari
router.get('/', getAllShayaris);

module.exports = router;
