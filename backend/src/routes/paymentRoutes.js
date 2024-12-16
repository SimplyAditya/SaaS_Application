const express = require('express');
const { createCheckoutSession } = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/', createCheckoutSession);

module.exports = router;
