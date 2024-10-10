const express = require('express');
const User = require('../model/userModel');
const { handleSignup, handleLogin } = require('../controller/userController');
const router = express.Router();

router.post('/signup', handleSignup);
router.post('/login', handleLogin);

module.exports = router;