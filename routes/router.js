const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');
const userController = require('../controllers/userController.js');
const auth = require('../middleware/auth.js');

// api
// get todo items
router.get('/getItems', auth.auth, todoController.getItems);

// create todo item
router.post('/createItem', auth.auth, todoController.createItem);

// update todo item
router.patch('/updateItem/:id', auth.auth, todoController.updateItem);

// delete todo item
router.delete('/deleteItem/:id', auth.auth, todoController.deleteItem);

// auth
// create user
router.post('/users', auth.auth, userController.createUser);

// login user
router.post('/auth', userController.loginUser);

module.exports = router;
