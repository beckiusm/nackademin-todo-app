const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');
const userController = require('../controllers/userController.js');
const auth = require('../middleware/auth.js');

// api
// get todo items
router.get('/', auth.auth, todoController.getItems);

// get one item
router.get('/:id', auth.auth, todoController.getItem);

// create todo item
router.post('/', auth.auth, todoController.createItem);

// update todo item
router.patch('/:id', auth.auth, todoController.updateItem);

// delete todo item
router.delete('/:id', auth.auth, todoController.deleteItem);

// auth
// create user
router.post('/users', auth.auth, userController.createUser);

// login user
router.post('/auth', userController.loginUser);

module.exports = router;
