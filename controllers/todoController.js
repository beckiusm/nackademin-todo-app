const todoModel = require("../models/todoModel");

exports.getItems = async (req, res) => {
    try {
        const items = await todoModel.getItems();
        res.json(items);
    } catch (error) {
        res.json({error: error.message});
    }
}

exports.createItem = async (req, res) => {
    const {title, done} = req.body;
    try {
        const item = await todoModel.createItem(title, done);
        res.json(item);
    } catch (error) {
        res.json({error: error.message});
    }
}

exports.updateItem = async (req, res) => {
    const id = req.params.id;
    const {title, done} = req.body;
    try {
        const item = await todoModel.updateItem(id, title, done);
        res.json(
            {
                message: `Updated ${item} posts with id ${id}.`,
                item: { title, done }
            });
    } catch (error) {
        res.json({error: error.message});
    }
}

exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    try {
        const item = await todoModel.deleteItem(id);
        res.json({message: `Delete ${item} posts with id ${id}.`});
    } catch (error) {
        res.json({error: error.message});
    }
}