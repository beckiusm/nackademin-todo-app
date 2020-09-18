const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const auth = require('../middleware/auth.js');

// create user
router.post('/register', userController.createUser);

// login user
router.post('/auth', userController.loginUser);
router.delete('/', auth.auth, userController.deleteUser);
router.get('/info', auth.auth, userController.getUserInfo);

module.exports = router;