const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController.js');
const auth = require('../middleware/auth.js');

// get list
router.get('/:id', auth.auth, listController.getList);

// get lists
router.get('/', auth.auth, listController.getLists);

// create list
router.post('/', auth.auth, listController.createList);

// update list
router.patch('/:id', auth.auth, listController.updateList);

// delete list
router.delete('/:id', auth.auth, listController.deleteList);

module.exports = router;
