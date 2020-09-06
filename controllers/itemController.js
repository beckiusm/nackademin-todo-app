const itemModel = require('../models/itemModel');
const moment = require('moment');

exports.getItems = async (req, res) => {
	try {
		const items = await itemModel.getItems();
		res.json(items).status(200);
	} catch (error) {
		res.json({ error: error.message }).status(400);
	}
};

exports.getItem = async (req, res) => {
	const id = req.params.id;
	try {
		const item = await itemModel.getItem(id);
		res.json(item).status(200);
	} catch (error) {
		res.json({ error: error.message }).status(400);
	}
};

exports.createItem = async (req, res) => {
	const { title, done } = req.body;
	const userID = req.user._id;
	const date = moment().format();
	try {
		const item = await itemModel.createItem(title, done, date, userID);
		res.json(item).status(201);
	} catch (error) {
		res.json({ error: error.message }).status(400);
	}
};

exports.updateItem = async (req, res) => {
	const id = req.params.id;
	const { title, done } = req.body;
	const date = moment().format();
	try {
		const item = await itemModel.updateItem(id, title, done, date);
		res.json(
			{
				message: `Updated ${item} posts with id ${id}.`,
				item: { title, done, updated: date }
			}).status(200);
	} catch (error) {
		res.json({ error: error.message }).status(400);
	}
};

exports.deleteItem = async (req, res) => {
	if (req.user.role === 'admin') {
		const id = req.params.id;
		try {
			const item = await itemModel.deleteItem(id);
			res.json({ message: `Delete ${item} posts with id ${id}.` }).status(200);
		} catch (error) {
			res.json({ error: error.message }).status(400);
		}
	} else {
		res.sendStatus(401);
	}
};

