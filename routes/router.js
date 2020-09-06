const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController.js');
const listController = require('../controllers/listController.js');
const userController = require('../controllers/userController.js');
const auth = require('../middleware/auth.js');

// api
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

// auth
// create user
router.post('/users', auth.auth, userController.createUser);

// login user
router.post('/auth', userController.loginUser);

router.get('/lists/:id', auth.auth, listController.getList);
router.post('/lists', auth.auth, listController.createList);

module.exports = router;
