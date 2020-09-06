const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController.js');
const auth = require('../middleware/auth.js');

// get list
router.get('/:id', auth.auth, listController.getList);

// create list
router.post('/', auth.auth, listController.createList);

module.exports = router;
