const itemModel = require('../models/itemModel');
const moment = require('moment');

exports.getItems = async (req, res) => {
	try {
		const items = await itemModel.getItems();
		res.json(items);
	} catch (error) {
		res.json({ error: error.message });
	}
};

exports.getItem = async (req, res) => {
	const id = req.params.id;
	try {
		const item = await itemModel.getItem(id);
		res.json(item);
	} catch (error) {
		res.json({ error: error.message });
	}
};

exports.createItem = async (req, res) => {
	const { title, done } = req.body;
	const userID = req.user._id;
	const date = moment().format();
	try {
		const item = await itemModel.createItem(title, done, date, userID);
		res.json(item);
	} catch (error) {
		res.json({ error: error.message });
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
			});
	} catch (error) {
		res.json({ error: error.message });
	}
};

exports.deleteItem = async (req, res) => {
	if (req.user.role === 'admin') {
		const id = req.params.id;
		try {
			const item = await itemModel.deleteItem(id);
			res.json({ message: `Delete ${item} posts with id ${id}.` });
		} catch (error) {
			res.json({ error: error.message });
		}
	} else {
		res.sendStatus(401);
	}
};

