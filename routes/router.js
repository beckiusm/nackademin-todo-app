const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');

// get todo items
router.get('/getItems', todoController.getItems);

// create todo item
router.post('/createItem', todoController.createItem);

// update todo item
router.put('/updateItem/:id', todoController.updateItem);

// delete todo item
router.delete('/deleteItem/:id', todoController.deleteItem);

module.exports = router;