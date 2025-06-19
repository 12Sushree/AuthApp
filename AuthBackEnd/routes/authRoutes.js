const express = require('express');
const { sendOtp, signUp, login, getUserDetails } = require('../controller/authController');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/sendotp', sendOtp);
router.post('/signup',signUp);
router.post('/login',login);
router.get('/getuserdetails', auth, getUserDetails);

module.exports = router;