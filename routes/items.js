const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController.js');
const auth = require('../middleware/auth.js');

// get todo items
router.get('/', auth.auth, itemController.getItems);

// get one item
router.get('/:id', auth.auth, itemController.getItem);

// create todo item
router.post('/', auth.auth, itemController.createItem);

// update todo item
router.patch('/:id', auth.auth, itemController.updateItem);

// delete todo item
router.delete('/:id', auth.auth, itemController.deleteItem);

module.exports = router;
