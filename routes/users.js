const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const auth = require('../middleware/auth.js');

// create user
router.post('/register', auth.auth, userController.createUser);

// login user
router.post('/auth', userController.loginUser);

module.exports = router;