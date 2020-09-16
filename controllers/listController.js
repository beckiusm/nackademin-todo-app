const listModel = require('../models/listModel');

exports.getLists = async (req, res) => {
	const userID = req.user._id;
	try {
		const lists = await listModel.getLists(userID);
		res.json(lists).status(200);
	} catch (error) {
		res.json({ error: error.message }).status(400);
	}
};

exports.getList = async (req, res) => {
	const id = req.params.id;
	try {
		const list = await listModel.getList(id);
		res.json(list).status(200);
	} catch (error) {
		res.json({ error: error.message }).status(400);
	}
};

exports.createList = async (req, res) => {
	const { title } = req.body;
	const userID = req.user._id;
	try {
		const list = await listModel.createList(title, userID);
		res.status(201).json(list);
	} catch (error) {
		res.json({ error: error.message }).status(400);
	}
};

exports.updateList = async (req, res) => {
	const id = req.params.id;
	const { title } = req.body;
	try {
		const list = await listModel.updateList(id, title);
		res.json(
			{
				message: `Updated ${list} lists with id ${id}.`,
				list: { title, id }
			}).status(200);
	} catch (error) {
		res.json({ error: error.message });
	}
};

exports.deleteList = async (req, res) => {
	if (req.user.role === 'admin') {
		const id = req.params.id;
		try {
			const result = await listModel.deleteList(id);
			res.json({ message: `Deleted ${result.list} lists and ${result.items} item with list id ${id}.` }).status(200);
		} catch (error) {
			res.json({ error: error.message }).status(400);
		}
	} else {
		res.sendStatus(401);
	}
};

